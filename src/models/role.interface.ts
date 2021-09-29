export interface RoleDTO {
  role_title: string;
  role_desc: string | null;
  created_by: number;
}

export interface Role extends RoleDTO {
  role_id: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  is_deleted: boolean | null;
}
