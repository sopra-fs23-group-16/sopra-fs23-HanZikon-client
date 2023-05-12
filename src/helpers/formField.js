import PropTypes from "prop-types";
export const FormField = props => {
    return (
        <div className={props.className + ' field'}>
            <label className={props.className + ' label'}>
                {props.label}
            </label>
            <input
                className={props.className + ' input'}
                placeholder={props.placeholder}
                type={props.type}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    type:PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};