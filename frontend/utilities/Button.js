import Icon from "./Icon.js"

/**
 * Create UI Buttons
 * @param color @type String - Color of the button
 * @param name @type String - name of the button
 * @param icon @type String - Icon name (from Material Symbols)
 * @param outline @type Boolean - Outlined or Filled
 * @param event @type Function - Any method signature
 */
const Button = ({ color, name, icon, outline, event, size="fit" }) => {
    let borderColor = "border-" + color + "-500" 
    let textColor = "text-" + color + "-500" 
    let bgColor = "bg-" + color + "-500" 
    let width = "w-"+size
    return (
        <div onClick={event} className={`flex ${width} py-2 px-2 rounded-md justify-center cursor-pointer font-semibold text-sm items-center ${outline ? textColor : "text-white"} border ${outline ? borderColor : bgColor}`}>
            { icon && <Icon name={icon}/> }
            <div className="px-1">{ name }</div>
        </div>
    )
}

export default Button