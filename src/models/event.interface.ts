export interface EventDTO {
  event_name: string;
  event_desc: string;
  created_by: number;
}

export interface Event extends EventDTO {
  event_id: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  is_deleted: boolean | null;
}
