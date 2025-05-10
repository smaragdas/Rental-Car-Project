package com.automr.backend.validation;

import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber.PhoneNumber;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneValidator implements ConstraintValidator<ValidPhone, String> {

    private final PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance();

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.trim().isEmpty()) {
            return false;
        }
        try {
<<<<<<< HEAD
            PhoneNumber number = phoneUtil.parse(value, null); // null = auto-detect region
=======
            PhoneNumber number = phoneUtil.parse(value, "GR");
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
            return phoneUtil.isValidNumber(number);
        } catch (NumberParseException e) {
            return false;
        }
    }
}