---
title: Handling Disappearing .egg-info Directories with Docker Compose and Python
date: 2019-02-11T17:52:25.604Z
---

So it's been a while, but lately I've been writing Python (and [Erlang][]!) for
my full-time job at [Nextiva][], where we have a microservice architecture
mainly comprised of single-page apps, backed by Python applications accessed
through an API gateway. And as you'd expect, we make heavy use of Docker and
Docker Compose for local development[^pipenv]. One thing that has come up a
handful of times, however, is that an application's Docker image builds just
fine, and even runs by itself, but when mounting the application's source code
as a Docker Compose volume, the image's Python fails to find the package.

For example, take this basic `Dockerfile` for a Python application `my-app` that
uses a `requirements.txt` and `setup.py`:

```dockerfile
FROM python:3-alpine
WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . ./
RUN pip install -e .

CMD ["my-app"]
```

and an accompanying `docker-compose.yml`:

<!-- prettier-ignore -->
```yaml
version: 3
services:
  app:
    build: .
    volumes:
      - .:/app
```

Try to start it, and:

<!-- prettier-ignore -->
```bash
$ docker-compose up
Traceback (most recent call last):
  File "/usr/local/bin/my-app", line 5, in <module>
    from pkg_resources import load_entry_point
  File "/usr/local/lib/python3.7/site-packages/pkg_resources/__init__.py", line 2927, in <module>
    @_call_aside
  File "/usr/local/lib/python3.7/site-packages/pkg_resources/__init__.py", line 2913, in _call_aside
    f(*args, **kwargs)
  File "/usr/local/lib/python3.7/site-packages/pkg_resources/__init__.py", line 2940, in _initialize_master_working_set
    working_set = WorkingSet._build_master()
  File "/usr/local/lib/python3.7/site-packages/pkg_resources/__init__.py", line 635, in _build_master
    ws.require(__requires__)
  File "/usr/local/lib/python3.7/site-packages/pkg_resources/__init__.py", line 943, in require
    needed = self.resolve(parse_requirements(requirements))
  File "/usr/local/lib/python3.7/site-packages/pkg_resources/__init__.py", line 829, in resolve
    raise DistributionNotFound(req, requirers)
pkg_resources.DistributionNotFound: The 'my-app' distribution was not found and is required by the application
```

everything fails horribly.

What happens is that the `dockerfile›RUN pip install -e .` command in the
`Dockerfile` builds the Python package for the application in `/app`,
creating a `/app/my-app.egg-info` directory in the Docker image. But the copy
of the source code on your host machine probably doesn't have a `.egg-info`
directory, so when you start the application with `docker-compose up`, your
`.egg-info`-less copy of the source code directory replaces the image's copy,
leaving Python within the image unable to find it.

The [solution][][^kj] is twofold: first, add your applicaiton directory to the
`bash›$PYTHONPATH` environment variable in your `Dockerfile`:

```dockerfile
ENV PYTHONPATH=/app
```

Then, replace your `Dockerfile`'s `dockerfile›RUN pip install -e .` command
with:

```dockerfile
RUN cd /usr/local/lib/python3.7/site-packages && \
    python /app/setup.py develop
```

This creates your app's `.egg-info` in the Python `site-packages` directory,
and tells the Docker image's Python interpreter that it can find packages in
the `/app` directory. As a result, the application will run both as a standalone
Docker image in production, and in local development with a Docker Compose
volume mount.

[^pipenv]:

    I personally use [Pipenv][] for local virtual environment and support
    package management, which streamlines my day-to-day code-writing
    substantially combined with VS Code's Python extension.

[^kj]: Credit to [Kevin James][].

[erlang]: https://www.erlang.org/
[nextiva]: https://www.nextiva.com/
[pipenv]: https://pipenv.readthedocs.io/
[solution]: https://thekev.in/blog/2016-11-18-python-in-docker/index.html
[kevin james]: https://github.com/TheKevJames
