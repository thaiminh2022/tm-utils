export const SITE_NAME = "TM-Utils" as const;

const index: PathInformation = {
    id: "index",
    label: "Trang chủ",
    path: "/",
    category: "general",
    description: "Trang chính của trang web"

};
const math_index: PathInformation = {
    id: "math_index",
    label: "Các công cụ Toán",
    path: "math",
    category: "toán",
    description: "Các công cụ liên quan đến toán"

};
const math_nhamnghiem: PathInformation = {
    id: "math_nhamgnhiem",
    label: "Nhẩm nghiệm",
    path: "math/nhamnghiem",
    category: "toán",
    description: "Tìm nghiệm của phương trình bậc 2"

};

const double_saving_interest: PathInformation = {
    id: "double_saving_interest",
    label: "Tính lãi kép",
    path: "finance/laikep",
    category: "tài chính",
    description: "Tính lãi kép tài khoản tiết kiệm"

};


export const paths_information = {
    index, 
    math_index,
    math_nhamnghiem, 
    double_saving_interest
} as const;



export function get_paths_info_as_array(): PathInformation[] {
    return Object.values(paths_information);
}
export function get_paths_by_category(): CategoryInformation[] {
    const pths = get_paths_info_as_array();
    const categories = [...new Set(pths.map(p => p.category))];
    return categories.map(i => {
        return {
            category: i,
            paths: pths.filter(p => p.category == i)
        };
    });
}



type PathInformation = {
    id: string,
    label: string,
    path: string,
    category: Category,
    description?: string

}
type CategoryInformation = {
    category: Category,
    paths: PathInformation[],
}

type Category = "toán" | "tài chính" | "general";

