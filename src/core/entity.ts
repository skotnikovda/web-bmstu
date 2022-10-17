import EntityID from './entity.id';

export default abstract class Entity<IDType extends EntityID, PropsType> {
  private readonly _id: IDType;

  protected _props: PropsType;

  get id(): IDType {
    return this._id;
  }

  protected constructor(props: PropsType, id?: IDType) {
    this._id = id || new EntityID() as IDType;
    this._props = props;
  }

  update(props: PropsType) {
    this._props = props;
  }
}
