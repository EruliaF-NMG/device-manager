
const emptyFunction = (...para) => undefined;

const buttonTypes = {
    primary:'primary',
    ghost:"ghost",
    dashed:"dashed",
    link:"link",
    text:"text",
    default:"default"
}

const buttonShape = {
    default:'default',
    circle:"circle",
    round:"round",
}

const buttonSize = {
    large:'large',
    middle:"middle",
    small:"small",
}

const inputValidateStatus = {
    success:'success',
    warning:"warning",
    error:"error",
    validating:"validating",
}

const formLayoutTypes = {
    horizontal:'horizontal',
    vertical:"vertical",
    inline:"inline",
}

export {
    emptyFunction,
    buttonTypes,
    buttonShape,
    buttonSize,
    inputValidateStatus,
    formLayoutTypes
}