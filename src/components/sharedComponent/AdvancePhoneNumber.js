import React from 'react';
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'

const AdvancePhoneNumber = (props) => {
    let defaultCountry = (props.defaultCountry && props.defaultCountry.countryCode ? props.defaultCountry.countryCode.toLowerCase() : 'us');

    return (
        <PhoneInput
            country={defaultCountry}
            value={props.phoneNumber}
            onChange={props.onChange}
        />
    )
}

export default AdvancePhoneNumber;