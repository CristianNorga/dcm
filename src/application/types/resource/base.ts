import { ResourceTypes, InfraestructureTypes } from '~~/src/application/enums/Resource.enum';

export type Resource = {
  id: string;
	namespace: string;
	name: string;
	type: ResourceTypes;
  infrastructure: InfraestructureTypes;
  tags: string[];
  dynamic: Record<string, string>;
};

export type Service = Resource & {
  type: ResourceTypes.Service;
  owner: string[];
  inputs: string[];
  outputs: string[];
};