export const capitalizeTitle = (title) => {
  if(title.includes('_')) {
    title = title.replace('_', ' ')
  }
  return title[0].toUpperCase() + title.slice(1, title.length)
}

export const deleteLine = (title) => {
  if(title.includes('_')) {
    title = title.replace('_', '')
  }
  return title
}
