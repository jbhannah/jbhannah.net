export const adjustColor = (color: string, amount: number) => {
  const hex = parseInt(color.slice(-6), 16)

  const r = normalize((hex >> 16) + amount)
  const b = normalize(((hex >> 8) & 0x00ff) + amount)
  const g = normalize((hex & 0x0000ff) + amount)

  const newColor = g | (b << 8) | (r << 16)
  return `#${newColor.toString(16)}`
}

const normalize = (val: number) => (val > 255 ? 255 : val < 0 ? 0 : val)
