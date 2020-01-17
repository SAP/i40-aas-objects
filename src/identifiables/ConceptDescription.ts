import { IEmbeddedDataSpecification } from '../baseClasses/EmbeddedDataSpecification';
import { IModelType, IModelTypeConstructor } from '../baseClasses/ModelType';
import { IReference, Reference } from '../baseClasses/Reference';
import { ILangString } from '../baseClasses/LangString';
import { IIdentifier } from '../baseClasses/Identifier';
import { IAdministrativeInformation } from '../baseClasses/AdministrativeInformation';
import { Identifiable } from '../characteristics/Identifiable';
import { KeyElementsEnum } from '../types/KeyElementsEnum';

interface IConceptDescription {
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType: IModelType;
    idShort: string;
    parent?: Reference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    isCaseOf?: Array<IReference>;
}
interface TConceptDescriptionJSON {
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    modelType?: IModelTypeConstructor;
    idShort: string;
    parent?: IReference;
    category?: string;
    descriptions?: Array<ILangString>;
    identification: IIdentifier;
    administration?: IAdministrativeInformation;
    isCaseOf?: Array<IReference>;
}
class ConceptDescription extends Identifiable implements IConceptDescription {
    static fromJSON(obj: TConceptDescriptionJSON) {
        var cd = new ConceptDescription(
            obj.identification,
            obj.idShort,
            obj.administration,
            obj.isCaseOf, //isCaseOf
            obj.descriptions,
            obj.category,
            obj.parent ? new Reference(obj.parent) : undefined,
            obj.embeddedDataSpecifications, //embeddedDataSpecifications
        );
        return cd;
    }
    isCaseOf?: Array<IReference> = [];
    embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>;
    constructor(
        identification: IIdentifier,
        idShort: string,
        administration?: IAdministrativeInformation,
        isCaseOf?: Array<IReference>,
        descriptions?: Array<ILangString>,
        category?: string,
        parent?: Reference,
        embeddedDataSpecifications?: Array<IEmbeddedDataSpecification>,
    ) {
        super(
            identification,
            idShort,
            { name: KeyElementsEnum.ConceptDescription },
            administration,
            descriptions,
            category,
            parent,
        );
        this.embeddedDataSpecifications = embeddedDataSpecifications || [];
        if (isCaseOf) this.setIsCaseOf(isCaseOf);
    }
    setIsCaseOf(isCaseOf: Array<IReference>) {
        var that = this;
        this.isCaseOf = [];
        isCaseOf.forEach(function(isCaseOfinstance: IReference) {
            that.addIsCaseOf(isCaseOfinstance);
        });
        return this;
    }
    addIsCaseOf(isCaseOfinstance: IReference) {
        if (!this.isCaseOf) {
            this.isCaseOf = [];
        }
        this.isCaseOf.push(new Reference(isCaseOfinstance));
        return this;
    }

    toJSON(): IConceptDescription {
        let res: any = super.toJSON();
        res.isCaseOf = this.isCaseOf;
        return res;
    }
}
export { ConceptDescription, TConceptDescriptionJSON, IConceptDescription };
