export interface Product {
    id: string;
    title: string;
    description: string;

    price: any;    ///MONEY

    brand: string;
    views: number;
    condition: Condition;

    address: Address;
    productSize: ProductSize;
    uploadDate: Date;
    visibility: Visibility ;
    availability: Availability;
    productCategory: ProductCategory;
    seller: User;
    usersThatLiked: User[];
    offers: Offer[];
    messages: Message[];
    order: Order;
}

export interface Clothing extends Product {
    productGender: ProductGender;
    size: string;                           // TODO: 01/05/2023 deve essere un enum 
    colour: string;                         // TODO: 01/05/2023 deve essere un enum 
    clothingType: ClothingType;
}

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    photo: any;             ///byte[]
    provider: Provider;
    address: Address;
    role: UserRole;
    defaultPaymentMethod: PaymentMethod;
    paymentMethods: PaymentMethod[];
    offers: Offer[];
    followers: User[];
    soldProducts: Product[];
    follows: User[];
    likes: Product[];
    sendMessages: Message[];
    receivedMessages: Message[];
    orders: Order[];
    receivedReviews: Review[];
    sentReviews: Review[];
}

export interface PaymentMethod {
    id: string;
    creditCard: string;
    expiryDate: string;     //why not Date?
    owner: string;
    defaultUser: User;    
    ownerUser: User;
}

export interface Offer {
    id: string;
    amount: any;        //MONEY
    state: OfferState;
    offerer: User;
    product: Product;
    message: Message;
    order: Order;
}

export interface Order {
    id: string;
    state: OrderState;  
    orderDate: Date;
    product: Product;
    user: User;
    delivery: Delivery;
    offer: Offer;
}

export interface Review {
    id: string;
    title: string;
    description: string;
    vote: number;
    reviewer: User;
    reviewed: User;
}

export interface Message {
    id: string;
    context: string;
    product: Product;
    sendUser: User;
    receivedUser: User;
    offer: Offer;
}

export interface Delivery {
    id: string;
    order: Order;
    deliveryCost: any;          //MONEY
    shipper: string;
    senderAddress: Address;
    receiverAddress: Address;
}

export interface Address {
    country: string;
    city: string;
    street: string;
    postalCode: string;
}

export interface Transaction {
    id: string;
    amount: any;     //MONEY    
    paymentMethod: PaymentMethod;
}

export interface OrderCreateDTO {
    state: OrderState;
    product: Product;
    delivery: Delivery;
    offer: Offer;
}

export enum OrderState {
    CANCELED,
    PENDING,
    PURCHASED, // once the payment is done
    SHIPPED, // for the whole shipment duration
    DELIVERED, // once the shipment is done
    COMPLETED, // once the product is received
}

export enum Condition {
    NEW_WITH_TAG,   // never used with tag
    NEW_WITHOUT_TAG, // never used without tag
    VERY_GOOD, // used but in good condition
    GOOD, // used but in good condition
    ACCEPTABLE, // used but in acceptable condition
}

export enum ClothingType {
    CLOTHS_JEANS,CLOTHS_DRESS,CLOTHS_SKIRT,CLOTHS_T_SHIRT,CLOTHS_SWEATERS,CLOTHS_TROUSERS,
    SHOES_BOOTS,SHOES_HEELS,SHOES_SPORT,SHOES_TRAINERS,SHOES_SANDALS,
    BAGS_SHOULDER_BAG,BAGS_HANDBAGS,BAGS_LUGGAGE,BAGS_BACKPACKS,
    ACCESSORIES_WATCHES,ACCESSORIES_SUNGLASSES,ACCESSORIES_BELTS,ACCESSORIES_HATS_CAPS
}

export  enum ProductGender {
    MALE,FEMALE,UNISEX
}

export enum OfferState {
    PENDING,
    ACCEPTED,
    REJECTED,
}

export enum ProductSize {
    BIG,
    MEDIUM,
    SMALL
}

export enum Visibility {
    PUBLIC,
    PRIVATE
}

export enum Availability {
    AVAILABLE,
    PENDING,
    UNAVAILABLE,
}

export enum ProductCategory {
    OTHER,ENTERTAINMENT,HOME,CLOTHING
}

export enum Provider {
    LOCAL,GOOGLE
}

export enum UserRole {
    ADMIN,
    USER,
}