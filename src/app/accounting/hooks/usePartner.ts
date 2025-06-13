import { CreatePartnerPayload } from "@/interfaces/partner.interface";
import { useMessage } from "@/providers/MessageProvider";
import { partnerService } from "@/services/partner.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const QUERY_KEYS = {
  PARTNERS: {
    ALL: ["partners"] as const,
    CLIENTS: (customerId: string) =>
      ["partners", "clients", customerId] as const,
    SUPPLIERS: (customerId: string) =>
      ["partners", "suppliers", customerId] as const,
    DETAIL: (id: string) => ["partners", id] as const,
  },
} as const;

// Hook để lấy danh sách đối tác là client
export const useClient = (customerId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.PARTNERS.CLIENTS(customerId),
    queryFn: () =>
      partnerService.callGetAll(`?partnerType=client&customerId=${customerId}`),
    enabled: !!customerId,
  });
};

// Hook để lấy danh sách đối tác là  supplier
export const useSuppliers = (customerId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.PARTNERS.SUPPLIERS(customerId),
    queryFn: () =>
      partnerService.callGetAll(
        `?partnerType=supplier&customerId=${customerId}`
      ),
    enabled: !!customerId,
  });
};

// Hook để tạo partner mới
export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  const messageApi = useMessage();

  return useMutation({
    mutationFn: (data: CreatePartnerPayload) => partnerService.create(data),
    onSuccess: (data, variables) => {
      // Invalidate và refetch queries liên quan
      if (variables.partnerType === "client") {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.PARTNERS.CLIENTS(variables.customerId),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.PARTNERS.SUPPLIERS(variables.customerId),
        });
      }

      // Hiển thị thông báo thành công
      const partnerType =
        variables.partnerType === "client" ? "khách hàng" : "nhà cung cấp";
      messageApi.success(`Thêm ${partnerType} thành công`);
    },
    onError: (error: any) => {
      messageApi.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });
};

// Hook để cập nhật partner
export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  const messageApi = useMessage();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePartnerPayload }) =>
      partnerService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidate và refetch queries liên quan
      if (variables.data.partnerType === "client") {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.PARTNERS.CLIENTS(variables.data.customerId),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.PARTNERS.SUPPLIERS(variables.data.customerId),
        });
      }

      const partnerType =
        variables.data.partnerType === "client" ? "khách hàng" : "nhà cung cấp";
      messageApi.success(`Cập nhật ${partnerType} thành công`);
    },
    onError: (error: any) => {
      messageApi.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });
};

// Hook để xóa partner
export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  const messageApi = useMessage();

  return useMutation({
    mutationFn: (id: string) => partnerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PARTNERS.ALL,
      });
      messageApi.success("Xóa thành công");
    },
    onError: (error: any) => {
      messageApi.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });
};
