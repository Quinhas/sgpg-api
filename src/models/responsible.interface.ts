export interface ResponsibleDTO {
  responsible_name: string;
  responsible_cpf: string;
  responsible_email: string | null;
  responsible_phone: string;
  responsible_addr: string;
  created_by: number;
}

export interface Responsible extends ResponsibleDTO {
  responsible_id: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  is_deleted: boolean | null;
}
