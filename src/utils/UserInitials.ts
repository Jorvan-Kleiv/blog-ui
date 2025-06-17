// utils/userInitials.ts
import type {User} from "../type/types.ts";

export const getRandomColor = (username: string) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

export const getUserInitials = (user: User | any) => {
  if (user && user.username) {
    const parts = user.username.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
      initials += parts[i].charAt(0).toUpperCase();
    }
    return initials;
  }
  return '';
};