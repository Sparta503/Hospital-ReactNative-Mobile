declare module 'react-native' {
  export interface NativeSyntheticEvent<T> {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: number;
    defaultPrevented: boolean;
    dispatchConfig: any;
    eventPhase: number;
    isDefaultPrevented: () => boolean;
    isPropagationStopped: () => boolean;
    isTrusted: boolean;
    nativeEvent: T;
    persist: () => void;
    preventDefault: () => void;
    stopPropagation: () => void;
    target: number;
    timeStamp: number;
    type: string;
    view?: any;
  }

  // Type declaration for $ReadOnlyArray to fix the bundling issue
  type $ReadOnlyArray<T> = readonly T[];
}
