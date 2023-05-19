const errorMessageList = {
    required: "The :attribute field is required",
    max: "The :attribute may not be greater than :max.",
    min: "The :attribute must be at least :min.",
    maxAmount: "The :attribute may not be greater than :max.",
    minAmount: "The :attribute must be at least :min.",
    digits: "The :attribute must have :min digits.",
    between: "The :attribute must be between :min and :max.",
    string: "The :attribute must be a string.",
    numeric: "The :attribute must be a number.",
    email: "The :attribute must be a valid email address.",
    requiredIf: "The :attribute field is required when :other is :value.",
    after_or_equal: 'The :attribute must be a date after or equal to :startDate.',
};

export {
    errorMessageList
}
