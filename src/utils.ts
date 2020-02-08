const classRegExp = (className: string) =>
  new RegExp(`(^|\\s+)${className.toString().trim()}(\\s+|$)`, 'g')

export const hasClass = (el: HTMLElement, className: string) =>
  classRegExp(className).test(el.className)

export const addClass = (el: HTMLElement, className: string) => {
  const classNames = className.split(' ')
  classNames.length > 1
    ? classNames.forEach(className => addClass(el, className))
    : hasClass(el, className) ||
      (el.className = `${el.className} ${className}`.trim())
}

export const removeClass = (el: HTMLElement, className: string) => {
  el.className = el.className.replace(classRegExp(className), ' ').trim()
}
