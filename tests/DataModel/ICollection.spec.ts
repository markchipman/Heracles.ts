import * as sinon from "sinon";
import LinksCollection from "../../src/DataModel/Collections/LinksCollection";
import TypesCollection from "../../src/DataModel/Collections/TypesCollection";
import { ILink } from "../../src/DataModel/ILink";
import { IResource } from "../../src/DataModel/IResource";
import { factories } from "../../src/JsonLd/factories";
import { hydra } from "../../src/namespaces";
import { run } from "../../testing/AsyncHelper";

function collectionOf(next: string, previous: string, ...iri: string[]) {
  const links: ILink[] = [];
  if (next) {
    links.push({ relation: hydra.next, target: next } as any);
  }

  if (previous) {
    links.push({ relation: hydra.previous, target: previous } as any);
  }

  const members: IResource[] = [];
  for (const item of iri) {
    members.push({ iri: item } as any);
  }

  const result = {
    hypermedia: {
      links: new LinksCollection(links),
      members
    }
  };

  return result;
}

describe("Given an instance of the ICollection interface", () => {
  beforeEach(() => {
    this.client = { getResource: sinon.stub() };
  });

  describe("which has no view associated", () => {
    beforeEach(() => {
      this.members = [];
      this.client.getResource.returns(this.members);
      const setup: any = {
        links: new LinksCollection([]),
        members: this.members,
        type: new TypesCollection([hydra.Collection])
      };
      this.collection = factories[hydra.Collection](setup as IResource, this.client, { processedObject: {} } as any);
    });

    it("should not have that view available", () => {
      expect(this.collection.getView()).toBeNull();
    });
  });

  describe("when obtaining members of a partial collection view", () => {
    beforeEach(() => {
      this.firstPage = { iri: "page:1" };
      this.secondPage = { iri: "page:2" };
      this.lastPage = { iri: "page:3" };
      this.firstBatch = collectionOf(this.secondPage, null, "some:item");
      this.secondBatch = collectionOf(this.lastPage, this.firstPage, "some:another-item");
      this.lastBatch = collectionOf(null, this.secondPage, "yet:another-item");
      this.initialLink = { relation: null, target: this.secondPage };
      this.initialMembers = [];
      const setup: any = {
        links: new LinksCollection([this.initialLink as any]),
        members: this.initialMembers,
        type: new TypesCollection([hydra.Collection])
      };
      const collectionResource = {};
      collectionResource[hydra.view] = [{ "@id": "some:view" }];
      this.result = [];
      this.collection = factories[hydra.Collection](setup as IResource, this.client, {
        processedObject: collectionResource
      } as any);
    });

    describe("by following next links", () => {
      beforeEach(
        run(async () => {
          this.initialLink.relation = hydra.next;
          this.firstBatch.hypermedia.members.forEach(item => this.initialMembers.push(item));
          this.client.getResource
            .onFirstCall()
            .returns(this.secondBatch)
            .onSecondCall()
            .returns(this.lastBatch);

          const view = this.collection.getView();
          while (view.hasNextPage) {
            for (const member of (await view.getNextPage()).members) {
              this.result.push(member);
            }
          }
        })
      );

      it("should not call the client for first page", () => {
        expect(this.client.getResource).not.toHaveBeenCalledWith(this.firstPage);
      });

      it("should call the client for second page", () => {
        expect(this.client.getResource).toHaveBeenCalledWith(this.secondPage);
      });

      it("should call the client for last page", () => {
        expect(this.client.getResource).toHaveBeenCalledWith(this.lastPage);
      });

      it("should provide a correct result", () => {
        expect(this.result).toEqual([this.secondBatch.hypermedia.members[0], this.lastBatch.hypermedia.members[0]]);
      });
    });

    describe("by following previous links", () => {
      beforeEach(
        run(async () => {
          this.initialLink.relation = hydra.previous;
          this.lastBatch.hypermedia.members.forEach(item => this.initialMembers.push(item));
          this.client.getResource
            .onFirstCall()
            .returns(this.secondBatch)
            .onSecondCall()
            .returns(this.firstBatch);

          const view = this.collection.getView();
          while (view.hasPreviousPage) {
            for (const member of (await view.getPreviousPage()).members) {
              this.result.push(member);
            }
          }
        })
      );

      it("should not call the client for last page", () => {
        expect(this.client.getResource).not.toHaveBeenCalledWith(this.lastPage);
      });

      it("should call the client for second page", () => {
        expect(this.client.getResource).toHaveBeenCalledWith(this.secondPage);
      });

      it("should call the client for first page", () => {
        expect(this.client.getResource).toHaveBeenCalledWith(this.firstPage);
      });

      it("should provide a correct result", () => {
        expect(this.result).toEqual([this.secondBatch.hypermedia.members[0], this.firstBatch.hypermedia.members[0]]);
      });
    });
  });
});