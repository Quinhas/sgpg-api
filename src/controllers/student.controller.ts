import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import { Student, StudentDTO } from "../models/student.interface";
import * as StudentService from "../services/student.service";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students: Student[] = await StudentService.findAll();
    res.status(200).send({
      message: `${students.length} Estudantes retornados.`,
      data: students,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const getStudentByID = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(new HttpException(400, "ID deve ser um número."));
  }
  try {
    const _student: Student | null = await StudentService.findByID(id);
    if (_student) {
      res.status(200).send({
        message: `Estudante encontrado com sucesso.`,
        data: _student,
      });
    } else {
      res.status(404).send({
        message: "Estudante não encontrado.",
      });
    }
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(error.message);
  }
};

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _student: StudentDTO = {
      student_name: req.body.student_name,
      student_rg: req.body.student_rg,
      student_cpf: req.body.student_cpf,
      student_email: req.body.student_email,
      student_phone: req.body.student_phone,
      student_addr: req.body.student_addr,
      student_responsible: req.body.student_responsible,
      student_scholarship: req.body.student_scholarship,  
      created_by: req.body.created_by,
    };

    const existingStudent: Student  | null =
    await StudentService.findUnique(
      _student.student_cpf,
      _student.student_email,
      _student.student_phone,
    );
    if (existingStudent) {
      next(
        new HttpException(404, `Estudante já está cadastrado no banco de dados.`)
      );
      return;
    }

    const newStudent: Student | null = await StudentService.create(_student);

    res.status(201).send({
      message: `Estudente criado com sucesso.`,
      data: newStudent,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _student: Partial<Student> = {
    student_name: req.body.student_name,
    student_rg: req.body.student_rg,
    student_cpf: req.body.student_cpf,
    student_email: req.body.student_email,
    student_phone: req.body.student_phone,
    student_addr: req.body.student_addr,
    student_responsible: req.body.student_responsible,
    student_scholarship: req.body.student_scholarship,  
    created_by: req.body.created_by,
    is_deleted: req.body.is_deleted,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  try {
    const existingStudent: Student | null = await StudentService.findByID(id);
    if (!existingStudent) {
      next(new HttpException(404, `Estudante de ID ${id} não existe.`));
      return;
    }

    const updatedStudent: Student | null = await StudentService.update(id, _student);

    res.status(200).send({
      message: `Estudante atualizado com sucesso.`,
      data: updatedStudent,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};

export const removeStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  try {
    const existingStudent: Student | null = await StudentService.findByID(id);
    if (!existingStudent) {
      next(new HttpException(404, `Estudante de ID ${id} não existe.`));
      return;
    }

    const _student: Student | null = await StudentService.remove(id);
    res.status(200).send({
      message: `Turma excluída com sucesso.`,
      data: _student,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
export const updateStudentDeletionState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    next(new HttpException(400, "ID deve ser um número."));
    return;
  }

  const _student: Partial<Student> = {
    is_deleted: true,
    deleted_at: req.body.is_deleted ? new Date() : null,
  };
  console.log(_student);
  try {
    const existingStudent: Student | null = await StudentService.findByID(id);
    if (!existingStudent) {
      next(new HttpException(404, `Clase de ID ${id} não existe.`));
      return;
    }

    const deletedStudent: Student | null = await StudentService.update(id,_student);

    res.status(200).send({
      message: `Studente deletada com sucesso.`,
      data: deletedStudent,
    });
  } catch (_error) {
    const error = _error as Error;
    res.status(500).send(new HttpException(500, error.message));
  }
};
