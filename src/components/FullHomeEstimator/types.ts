export interface UserInfo {
    name: string;
    phone: string;
    location: string;
    pincode: string;
  }
  
  export interface FurnitureItem {
    style: string;
    quantity: number;
  }
  
  export interface ServiceItem {
    style: string;
    quantity: number;
  }
  
  export interface FlooringItem {
    style: string;
    quantity: number;
  }
  
  export interface FullHomeFormData {
    homeType: string;
    carpetArea: string;
    furniture: Record<string, Record<string, FurnitureItem>>;
    services: {
      list: Record<string, ServiceItem>;
      flooring: Record<string, FlooringItem>;
    };
    userInfo: UserInfo;
  }
  