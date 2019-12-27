import React from 'react';

const StitchFormFields = (props) => (
    <form onSubmit={props.formikProps.handleSubmit}>
        <input
            type="text"
            onChange={props.formikProps.handleChange}
            onBlur={props.formikProps.handleBlur}
            value={props.formikProps.values.name}
            name="name"
        />
        {props.formikProps.errors.name && <div id="feedback">{props.formikProps.errors.name}</div>}
        <button type="submit">Submit</button>
    </form>
);

export default StitchFormFields;