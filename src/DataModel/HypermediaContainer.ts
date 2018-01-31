import { hydra } from "../namespaces";
import LinksCollection from "./Collections/LinksCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { ICollection } from "./ICollection";
import { IHypermediaContainer } from "./IHypermediaContainer";
import { IResource } from "./IResource";

/**
 * Provides a default implementation of the {@link IHypermediaContainer} interface.
 * @class
 */
export default class HypermediaContainer extends ResourceFilterableCollection<IResource>
  implements IHypermediaContainer {
  public readonly members?: ResourceFilterableCollection<IResource>;

  public readonly collections: ResourceFilterableCollection<ICollection>;

  public readonly operations: OperationsCollection;

  public readonly links: LinksCollection;

  /**
   * Initializes a new instance of the {@link HypermediaContainer} class.
   * @param items {Iterable<IResource>} Hypermedia controls to be stored within this container.
   * @param operations {OperationsCollection} Operations available on the container.
   * @param links {LinksCollection} Links available on the container.
   * @param members {ResourceFilterableCollection<IResource>} Optional Hydra collection members in case
   *                                                          container is a collection.
   */
  public constructor(
    items: Iterable<IResource>,
    operations: OperationsCollection,
    links: LinksCollection,
    members?: ResourceFilterableCollection<IResource>
  ) {
    super(items);
    const itemsArray = Array.from(items);
    const explicitCollections: ICollection[] = itemsArray
      .filter(control => control.type.contains(hydra.Collection))
      .map(control => control as ICollection);
    const availableCollections: ICollection[] =
      itemsArray
        .filter(control => !!(control as any).collections)
        .map(control => Array.from((control as any).collections) as ICollection[])[0] || [];
    this.operations = operations;
    this.collections = new ResourceFilterableCollection<ICollection>(explicitCollections.concat(availableCollections));
    this.links = links;
    this.members =
      members instanceof ResourceFilterableCollection ? members : new ResourceFilterableCollection<IResource>(members);
  }
}
