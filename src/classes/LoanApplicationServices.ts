// Importar las declaraciones necesarias

import { prisma } from "../prisma/db";
import { LoanApplication } from "@prisma/client";
import { ScalarLoanApplication, Status } from "../types/User";

// Clase para el servicio de LoanApplication
class LoanApplicationService {
  // Método para crear una solicitud de préstamo
  static async create(data: ScalarLoanApplication): Promise<LoanApplication> {
    const { userId, ...loanApplicationDataWithoutUserId } = data;
    const loanApplicationData = {
      ...loanApplicationDataWithoutUserId,
      court: new Date(data.court).toISOString(),
      date_relationship: new Date(data.date_relationship).toISOString(),
      user: {
        connect: {
          id: data.userId,
        },
      },
    };
    return prisma.loanApplication.create({ data: loanApplicationData });
  }

  // Método para obtener una solicitud de préstamo por su ID
  static async get(id: string): Promise<LoanApplication | null> {
    return prisma.loanApplication.findUnique({ where: { id } });
  }

  // Método para actualizar una solicitud de préstamo
  static async update(
    id: string,
    data: ScalarLoanApplication
  ): Promise<LoanApplication> {
    return prisma.loanApplication.update({ where: { id }, data });
  }

  // Método para eliminar una solicitud de préstamo
  static async delete(id: string): Promise<LoanApplication> {
    return prisma.loanApplication.delete({ where: { id } });
  }

  // Método para obtener todas las solicitudes de préstamo
  static async getAll(): Promise<LoanApplication[]> {
    return prisma.loanApplication.findMany();
  }

  // Método para obtener una solicitud de préstamo por el ID del usuario
  static async getByUserId(userId: string): Promise<LoanApplication | null> {
    return prisma.loanApplication.findFirst({ where: { userId } });
  }

  // Método para obtener todas las solicitudes de préstamo por userId
  static async getAllByUserId(userId: string): Promise<LoanApplication[]> {
    return prisma.loanApplication.findMany({
      where: { userId },
    });
  }

  static async changeStatus(loanApplicationId: string, newStatus: Status) {
    return prisma.loanApplication.update({
      where: { id: loanApplicationId },
      data: { status: newStatus },
    });
  }
}

// Exportar la clase LoanApplicationService
export default LoanApplicationService;
