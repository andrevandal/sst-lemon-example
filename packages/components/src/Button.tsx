
type ButtonProps = {
  variant?: "primary" | "secondary"
  inline?: boolean
  loading?: boolean
}

const inlineStyles = `inline-flex min-h-12 min-w-[70px] w-fit p-small -mx-smallest text-action-small`
const blockStyles = `flex min-h-14 px-large py-main w-[calc(100%+8px)] -mx-smallest text-action`

export const buttonVariantMap = {
  primary: `text-white bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-grey-400`,
  secondary: `text-green-700 disabled:fg-disabled bg-grey-100 hover:bg-grey-200 active:bg-grey-300 disabled:bg-grey-100 disabled:text-grey-100`,
}

const defaultStyles = `justify-center items-center rounded-small focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500`

const loadingStyles = `pointer-events-none`

export const Button = ({ variant = 'primary', inline = false, loading = false, ...props }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const inlineStyle = inline ? inlineStyles : blockStyles
    const variantStyle = buttonVariantMap[variant]
    const loadingStyle = loading ? loadingStyles : ''

  return <button className={[defaultStyles, inlineStyle, variantStyle, loadingStyle].join(' ')} {...props} />
}