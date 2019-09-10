---
date: 2019-09-10T19:28:47.131Z
---

# Secure k3s over WireGuard with Kilo

I've ended up collecting a handful of [SSDNodes][][^ssdn] VPSs, and have been
fascinated with [Kubernetes][] lately, starting with projects at work and
progressing into my own research, so putting the two together was obvious.
The only hangup I had is that the VPSes were only assigned public IP
addresses[^ips] and I wanted to ensure that intra-cluster communication would
all be secure, preferably over [WireGuard][] for its combination of sufficient
security with high performance and low overhead. I also wanted a frictionless
experience with setting up the Kubernetes cluster itself, and had already
used Rancher's [k3s][] on a Raspberry Pi cluster at home[^rpi]. After some
Googling and trial-and-error, I disovered [Kilo][] and found it to be the
most straightforward way to mesh my VPSs together and secure their
intra-cluster traffic[^src].

_Note:_ My servers are all x86-64 machines running Ubuntu Server 18.04, but
there are very few steps that are architecture- or distribution-dependent, so
it should be easy enough to apply to other varieties of each.

## Starting Up

You'll be running most of these commands as `root`, so start with[^sudo]:

```bash
sudo -i
```

From a freshly-installed and -updated system, the first step is to install
WireGuard:

```bash
add-apt-repository ppa:wireguard/wireguard
apt-get update
apt-get install wireguard
```

and allow communication between each node over the default port of `51820` (or
your port of choice), as well as incoming SSH connections:

```bash
ufw allow from ${node_ip} to any port 51820 proto udp
ufw limit ssh
ufw enable
```

Repeat on each node for each of the other nodes, updating `${node_ip}`
appropriately for each command.

## Installing k3s

Generate a cluster secret, and copy it to your local machine's clipboard for
reuse on each node. e.g. on macOS:

```bash
head -c48 /dev/urandom | base64 | tr -d "\n" | pbcopy
```

k3s comes with a handy `curl`able installation script that takes the [options][]
for the k3s service on each node, downloads the binary of the latest version for
the correct architecture, and creates, enables, and starts a system service.
Typically, [Flannel][] is installed as the CNI for the k3s cluster, but Kilo
will act as the CNI for this installation and we want the default values for all
other options, so `--no-flannel` is the only added option that we'll pass.

Choose a node to be the server, and run:

```bash
ufw allow 6443/tcp
curl -sfL https://get.k3s.io | K3S_CLUSTER_SECRET="<paste secret here>" \
    sh -s - server --no-flannel
```

Then on each worker node[^server]:

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://<server address>:6443 \
    K3S_CLUSTER_SECRET="<paste secret here>" sh -s - agent --no-flannel
```

and a few more firewall rules across all nodes to allow intra-cluster
traffic[^metrics]:

```bash
ufw default allow routed
ufw allow in on cni0 from 10.42.0.0/16
ufw allow in on kube-bridge from 10.42.0.0/16
```

## Installing Kilo

Kilo has a handy [manifest][] for quick installation on a k3s cluster, but
there's one change we want to make to it to ensure that all of our nodes
connect to each other over WireGuard. Kilo's [topology][] typically relies on
the `failure-domain.beta.kubernetes.io/region` node label[^fd], and creates a
WireGuard link only across failure domains. Since all of our servers are in
the same datacenter, they would technically belong to the same failure
domain, but we still want them to be meshed together. Luckily, Kilo includes a
command-line flag for this, and only one line needs to be added to the manifest.

On the k3s cluster server, download the manifest:

```bash
curl -LO https://raw.githubusercontent.com/squat/kilo/master/manifests/kilo-k3s.yaml
```

then make the following change to the `DaemonSet` pod template in the manifest:

```diff{numberLines: 99}
       - name: kilo
         image: squat/kilo
         args:
         - --kubeconfig=/etc/kubernetes/kubeconfig
         - --hostname=$(NODE_NAME)
+        - --mesh-granularity=full
         env:
         - name: NODE_NAME
           valueFrom:
             fieldRef:
               fieldPath: spec.nodeName
```

and finally, apply it to the cluster:

```bash
kubectl apply -f kilo-k3s.yaml
```

If all went as expected, you can now see the connections between each server
with the `wg` command:

```bash
~# wg
interface: kilo0
  public key: (server public key)
  private key: (hidden)
  listening port: 51820

peer: (worker 1 public key)
  endpoint: xx.xx.xx.xx:51820
  allowed ips: 10.42.1.0/24, xx.xx.xx.xx/32, 10.4.0.2/32
  latest handshake: 1 minute, 22 seconds ago
  transfer: 74.44 MiB received, 145.34 MiB sent

peer: (worker 2 public key)
  endpoint: xx.xx.xx.xx:51820
  allowed ips: 10.42.2.0/24, xx.xx.xx.xx/32, 10.4.0.1/32
  latest handshake: 1 minute, 24 seconds ago
  transfer: 64.80 MiB received, 85.79 MiB sent

peer: (worker 3 public key)
  endpoint: xx.xx.xx.xx:51820
  allowed ips: 10.42.0.0/24, xx.xx.xx.xx/32, 10.4.0.4/32
  latest handshake: 1 minute, 31 seconds ago
  transfer: 163.28 MiB received, 214.71 MiB sent
```

[^ssdn]:

    This is an affiliate referral link, but if you don't mind a more DIY host
    with fewer features and a less polished dashboard than [DigitalOcean][] or
    [Linode][] (both also affiliate referral links), then SSDNodes definitely
    can't be beat with regards to pricing, especially if you catch one of their
    sales. All of mine were bought during a sale for the opening of a new
    datacenter, at \$79/year for 3 years for 4 vCPUs, 16 GB RAM, and 160 GB SSD.

[^ips]:

    Private IPs are available on request if you submit a support ticket, but
    when I discovered this I had already done all of the legwork on setting up
    Kilo and WireGuard and started writing this post, so ¯\\\_(ツ)\_/¯

[^rpi]: That's a blog post for another time.
[^src]:

    The entire set of Ansible playbooks and Kubernetes manifests for the cluster
    is [on GitHub][hfi], if you want a fuller context or automated way to deploy
    this setup.

[^sudo]:

    Your systems all have appropriately-set `sudoers` rules and passwordless and
    `root` SSH logins disabled, right?

[^server]: `<server address>` can be an IP address or resolvable domain name.
[^metrics]:

    If you're planning on running `metrics-server`, you'll also need to allow
    that for each node:

        ufw allow from ${node_ip} to any port 10250 proto tcp

[^fd]: Adding this label is optional but recommended for this setup.

[digitalocean]: https://m.do.co/c/0c4743ec7101
[flannel]: https://github.com/coreos/flannel
[hfi]: https://github.com/hannahs-family/infrastructure
[linode]: https://www.linode.com/?r=34a818be960210afe1281f13a5e6f032dcd8bbb2
[k3s]: https://k3s.io/
[kilo]: https://github.com/squat/kilo
[kubernetes]: https://kubernetes.io/
[manifest]: https://github.com/squat/kilo/blob/master/manifests/kilo-k3s.yaml
[options]: https://rancher.com/docs/k3s/latest/en/installation/
[ssdnodes]: https://www.ssdnodes.com/manage/aff.php?aff=854
[topology]: https://github.com/squat/kilo/blob/master/docs/topology.md
[wireguard]: https://www.wireguard.com/
