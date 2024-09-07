export interface IUser {
  id: number;
  position_id: number;
  name: string;
  email: string;
  phone: string;
  photo: string;
  position: IPosition;
}

export interface IPosition {
  id: number;
  name: string;
}

export interface IFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  positionId: number;
  photo: File | null;
}
