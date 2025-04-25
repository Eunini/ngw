const { ROLES } = require('../config/constants');

exports.capitalize = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

exports.formatRole = (role) => {
  if (!role) return '';
  const formatted = role.replace('_', ' ');
  return this.capitalize(formatted);
};

exports.getRolePermissions = (role) => {
  const permissions = {
    canCreateProject: true,
    canEditProject: true,
    canDeleteProject: false,
    canVerifyLicense: false,
    canAccessAdmin: false
  };

  switch (role) {
    case ROLES.ADMIN:
      permissions.canDeleteProject = true;
      permissions.canVerifyLicense = true;
      permissions.canAccessAdmin = true;
      break;
    case ROLES.DRILLING_COMPANY:
      permissions.canDeleteProject = true;
      break;
  }

  return permissions;
};

exports.formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};