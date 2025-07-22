import PropTypes from "prop-types";

// Mock component for React Router Link in tests
export const MockLink = ({ children, to, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

MockLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
