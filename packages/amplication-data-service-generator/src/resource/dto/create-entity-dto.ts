import { builders } from "ast-types";
import { Entity } from "../../types";
import { NamedClassDeclaration } from "../../util/ast";
import { isRelationField } from "../../util/entity";
import { createFieldClassProperty } from "./create-field-class-property";

export function createEntityDTO(
  entity: Entity,
  entityIdToName: Record<string, string>
): NamedClassDeclaration {
  const properties = entity.fields
    .filter((field) => !isRelationField(field))
    .map((field) =>
      createFieldClassProperty(field, !field.required, false, entityIdToName)
    );
  return builders.classDeclaration(
    builders.identifier(entity.name),
    builders.classBody(properties)
  ) as NamedClassDeclaration;
}
