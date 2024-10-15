export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 8;
  };
  
  export const validateName = (name) => {
    return name.length > 0;
  };

  /// 
  export const validateUsername = (username) => {
    return username.length > 0;
  }

  // In utils.js
export const getStatusColor = (status) => {
  // Your implementation here
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
};