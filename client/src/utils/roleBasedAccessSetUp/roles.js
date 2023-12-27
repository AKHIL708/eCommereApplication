export const rolePermissions = {
  customer: ["customer"],
  admin: ["admin", "customer"],
  superAdmin: ["superAdmin", "admin", "customer"],
};

export const hasRequiredRole = (userRole, requiredRole) => {
  const userPermissions = rolePermissions[userRole] || [];
  return userPermissions.includes(requiredRole);
};
