export interface ResponsibleDTO {
  responsible_name: string;
  responsible_cpf: string;
  responsible_email: string | null;
  responsible_phone: string | null;
  responsible_addr: string;
  created_by: number;
  is_deleted: boolean | null;
}

export interface Responsible extends ResponsibleDTO {
  responsible_id: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}
