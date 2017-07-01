const classRegExp = className => new RegExp(`(^|\\s+)${className.toString().trim()}(\\s+|$)`, 'g')

export const hasClass = (el, className) => classRegExp(className).test(el.className)

export const addClass = (el, className) => {
  const classNames = className.split(' ')
  classNames.length > 1 ? classNames.forEach(className => addClass(el, className))
    : hasClass(el, className) || (el.className = `${el.className} ${className}`.trim())
}

export const removeClass = (el, className) => {
  el.className = el.className.replace(classRegExp(className), ' ').trim()
}
