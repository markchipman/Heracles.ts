import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { ICollection } from "./ICollection";
import { IResource } from "./IResource";

/**
 * Provides an abstraction layer over hypermedia container.
 */
export interface IHypermediaContainer extends ResourceFilterableCollection<IResource> {
  /**
   * Gets a collection members.
   * This may be null if the resource owning this container is not a hydra:Collection.
   */
  readonly members?: ResourceFilterableCollection<IResource>;

  /**
   * Gets a collection of links.
   */
  readonly links: ResourceFilterableCollection<IResource>;

  /**
   * Gets possible operations.
   */
  readonly operations: OperationsCollection;

  /**
   * Gets discovered collections.
   */
  readonly collections: ResourceFilterableCollection<ICollection>;
}
