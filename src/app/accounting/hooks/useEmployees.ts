/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateEmployeePayload } from "@/interfaces/employee.interface";
import { useMessage } from "@/providers/MessageProvider";
import { employeeService } from "@/services/employee.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const QUERY_KEYS = {
  EMPLOYEES: {
    ALL: (customerId: string) => ["employees", customerId] as const,
    DETAIL: (employeeId: string) => ["employees", employeeId] as const,
  },
} as const;

// Hook để lấy danh sách nhân viên
export const useEmployees = (customerId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.EMPLOYEES.ALL(customerId),
    queryFn: () => employeeService.callGetAll(`?customerId=${customerId}`),
    enabled: !!customerId,
  });
};

// Hook để tạo nhân viên mới
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const messageApi = useMessage();

  return useMutation({
    mutationFn: (data: CreateEmployeePayload) => employeeService.create(data),
    onSuccess: (data, variables) => {
      // Invalidate và refetch queries liên quan
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EMPLOYEES.ALL(variables.customerId),
      });

      // Hiển thị thông báo thành công
      messageApi.success(`Thêm nhân viên thành công`);
    },
    onError: (error: any) => {
      messageApi.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });
};

// Hook để cập nhật nhân viên
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  const messageApi = useMessage();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateEmployeePayload }) =>
      employeeService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidate và refetch queries liên quan
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EMPLOYEES.ALL(variables.data.customerId),
      });

      messageApi.success(`Cập nhật nhân viên thành công`);
    },
    onError: (error: any) => {
      messageApi.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });
};

// Hook để xóa nhân viên
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const messageApi = useMessage();

  return useMutation({
    mutationFn: ({
      employeeId,
      customerId,
    }: {
      employeeId: string;
      customerId: string;
    }) => employeeService.delete(employeeId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EMPLOYEES.ALL(variables.customerId),
      });
      messageApi.success("Xóa nhân viên thành công");
    },
    onError: (error: any) => {
      messageApi.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });
};
