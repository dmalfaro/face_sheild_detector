export interface ClassificationTypes {
  vgg16: string;
  vgg19: string;
  densenet: string;
}

export interface SagaPayloadType {
  base64: string;
  url: string;
}

export interface HomepageState {
  loading: boolean;
  classification: ClassificationTypes;
}

export type ContainerState = HomepageState;
