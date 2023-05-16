import PropTypes from 'prop-types';



/**
 * Base template
 * @returns 
 */
const BaseTemplate = ({ children = null }) => {
    return (
        <div className='w-full'>
             {children}
        </div>
    );
}

BaseTemplate.propTypes = {
    children: PropTypes.node,
}

export {
    BaseTemplate
}