import { BasicTarget } from '../utils/dom';
export interface TargetSize {
    width: undefined | number;
    height: undefined | number;
}
export interface UseSizeOptions {
    onChange?: (size: TargetSize) => void;
}
export declare function useSize(target: BasicTarget, options?: UseSizeOptions): {
    width: number;
    height: number;
};
