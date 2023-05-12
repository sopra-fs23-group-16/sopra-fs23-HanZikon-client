import PropTypes from "prop-types";
export const FormField = props => {
    return (
        <div className={props.type + ' field'}>
            <label className={props.type + ' label'}>
                {props.label}
            </label>
            <input
                className={props.type + ' input'}
                placeholder={props.placeholder}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};