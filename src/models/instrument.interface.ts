export interface InstrumentDTO {
  instrument_type: number;
  instrument_model: string;
  instrument_brand: number;
  instrument_student: number | null;
  created_by: number;
}

export interface Instrument extends InstrumentDTO {
  instrument_id: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  is_deleted: boolean | null;
}
