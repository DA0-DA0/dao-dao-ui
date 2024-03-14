import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes, toTimestamp, fromTimestamp } from "../../../helpers";
/**
 * CreditType defines the measurement unit/precision of a certain credit type
 * (e.g. carbon, biodiversity...)
 */
export interface CreditType {
  /**
   * abbreviation is a 1-3 character uppercase abbreviation of the CreditType
   * name, used in batch denominations within the CreditType. It must be unique.
   */
  abbreviation: string;
  /** name is the name of the credit type (e.g. carbon, biodiversity). */
  name: string;
  /** unit is the measurement unit of the credit type (e.g. kg, ton). */
  unit: string;
  /** precision is the decimal precision of the credit type. */
  precision: number;
}
export interface CreditTypeProtoMsg {
  typeUrl: "/regen.ecocredit.v1.CreditType";
  value: Uint8Array;
}
/**
 * CreditType defines the measurement unit/precision of a certain credit type
 * (e.g. carbon, biodiversity...)
 */
export interface CreditTypeAmino {
  /**
   * abbreviation is a 1-3 character uppercase abbreviation of the CreditType
   * name, used in batch denominations within the CreditType. It must be unique.
   */
  abbreviation?: string;
  /** name is the name of the credit type (e.g. carbon, biodiversity). */
  name?: string;
  /** unit is the measurement unit of the credit type (e.g. kg, ton). */
  unit?: string;
  /** precision is the decimal precision of the credit type. */
  precision?: number;
}
export interface CreditTypeAminoMsg {
  type: "/regen.ecocredit.v1.CreditType";
  value: CreditTypeAmino;
}
/**
 * CreditType defines the measurement unit/precision of a certain credit type
 * (e.g. carbon, biodiversity...)
 */
export interface CreditTypeSDKType {
  abbreviation: string;
  name: string;
  unit: string;
  precision: number;
}
/** Class represents the high-level on-chain information for a credit class. */
export interface Class {
  /**
   * key is the table row identifier of the credit class used internally for
   * efficient lookups. This identifier is auto-incrementing.
   */
  key: bigint;
  /**
   * id is the unique identifier of the credit class auto-generated from the
   * credit type abbreviation and the credit class sequence number.
   */
  id: string;
  /** admin is the admin of the credit class. */
  admin: Uint8Array;
  /** metadata is any arbitrary metadata to attached to the credit class. */
  metadata: string;
  /** credit_type_abbrev is the abbreviation of the credit type. */
  creditTypeAbbrev: string;
}
export interface ClassProtoMsg {
  typeUrl: "/regen.ecocredit.v1.Class";
  value: Uint8Array;
}
/** Class represents the high-level on-chain information for a credit class. */
export interface ClassAmino {
  /**
   * key is the table row identifier of the credit class used internally for
   * efficient lookups. This identifier is auto-incrementing.
   */
  key?: string;
  /**
   * id is the unique identifier of the credit class auto-generated from the
   * credit type abbreviation and the credit class sequence number.
   */
  id?: string;
  /** admin is the admin of the credit class. */
  admin?: string;
  /** metadata is any arbitrary metadata to attached to the credit class. */
  metadata?: string;
  /** credit_type_abbrev is the abbreviation of the credit type. */
  credit_type_abbrev?: string;
}
export interface ClassAminoMsg {
  type: "/regen.ecocredit.v1.Class";
  value: ClassAmino;
}
/** Class represents the high-level on-chain information for a credit class. */
export interface ClassSDKType {
  key: bigint;
  id: string;
  admin: Uint8Array;
  metadata: string;
  credit_type_abbrev: string;
}
/**
 * ClassIssuers is a JOIN table for Class Info that stores the credit class
 * issuers
 */
export interface ClassIssuer {
  /**
   * class_key is the table row identifier of the credit class used internally
   * for efficient lookups. This links a class issuer to a credit class.
   */
  classKey: bigint;
  /** issuer is the approved issuer of the credit class. */
  issuer: Uint8Array;
}
export interface ClassIssuerProtoMsg {
  typeUrl: "/regen.ecocredit.v1.ClassIssuer";
  value: Uint8Array;
}
/**
 * ClassIssuers is a JOIN table for Class Info that stores the credit class
 * issuers
 */
export interface ClassIssuerAmino {
  /**
   * class_key is the table row identifier of the credit class used internally
   * for efficient lookups. This links a class issuer to a credit class.
   */
  class_key?: string;
  /** issuer is the approved issuer of the credit class. */
  issuer?: string;
}
export interface ClassIssuerAminoMsg {
  type: "/regen.ecocredit.v1.ClassIssuer";
  value: ClassIssuerAmino;
}
/**
 * ClassIssuers is a JOIN table for Class Info that stores the credit class
 * issuers
 */
export interface ClassIssuerSDKType {
  class_key: bigint;
  issuer: Uint8Array;
}
/** Project represents the high-level on-chain information for a project. */
export interface Project {
  /**
   * key is the table row identifier of the project used internally for
   * efficient lookups. This identifier is auto-incrementing.
   */
  key: bigint;
  /**
   * id is the unique identifier of the project either auto-generated from the
   * credit class id and project sequence number or provided upon creation.
   */
  id: string;
  /** admin is the admin of the project. */
  admin: Uint8Array;
  /**
   * class_key is the table row identifier of the credit class used internally
   * for efficient lookups. This links a project to a credit class.
   */
  classKey: bigint;
  /**
   * jurisdiction is the jurisdiction of the project.
   * Full documentation can be found in MsgCreateProject.jurisdiction.
   */
  jurisdiction: string;
  /** metadata is any arbitrary metadata attached to the project. */
  metadata: string;
  /** reference_id is any arbitrary string used to reference the project. */
  referenceId: string;
}
export interface ProjectProtoMsg {
  typeUrl: "/regen.ecocredit.v1.Project";
  value: Uint8Array;
}
/** Project represents the high-level on-chain information for a project. */
export interface ProjectAmino {
  /**
   * key is the table row identifier of the project used internally for
   * efficient lookups. This identifier is auto-incrementing.
   */
  key?: string;
  /**
   * id is the unique identifier of the project either auto-generated from the
   * credit class id and project sequence number or provided upon creation.
   */
  id?: string;
  /** admin is the admin of the project. */
  admin?: string;
  /**
   * class_key is the table row identifier of the credit class used internally
   * for efficient lookups. This links a project to a credit class.
   */
  class_key?: string;
  /**
   * jurisdiction is the jurisdiction of the project.
   * Full documentation can be found in MsgCreateProject.jurisdiction.
   */
  jurisdiction?: string;
  /** metadata is any arbitrary metadata attached to the project. */
  metadata?: string;
  /** reference_id is any arbitrary string used to reference the project. */
  reference_id?: string;
}
export interface ProjectAminoMsg {
  type: "/regen.ecocredit.v1.Project";
  value: ProjectAmino;
}
/** Project represents the high-level on-chain information for a project. */
export interface ProjectSDKType {
  key: bigint;
  id: string;
  admin: Uint8Array;
  class_key: bigint;
  jurisdiction: string;
  metadata: string;
  reference_id: string;
}
/** Batch represents the high-level on-chain information for a credit batch. */
export interface Batch {
  /**
   * key is the table row identifier of the credit batch used internally for
   * efficient lookups. This identifier is auto-incrementing.
   */
  key: bigint;
  /**
   * issuer is the address that created the batch and which is
   * authorized to mint more credits if open=true.
   */
  issuer: Uint8Array;
  /**
   * project_key is the table row identifier of the credit class used internally
   * for efficient lookups. This links a credit batch to a project.
   */
  projectKey: bigint;
  /**
   * denom is the unique identifier of the credit batch formed from the
   * project id, the batch sequence number, and the start and end date of the
   * credit batch.
   */
  denom: string;
  /** metadata is any arbitrary metadata attached to the credit batch. */
  metadata: string;
  /**
   * start_date is the beginning of the period during which this credit batch
   * was quantified and verified.
   */
  startDate?: Date | undefined;
  /**
   * end_date is the end of the period during which this credit batch was
   * quantified and verified.
   */
  endDate?: Date | undefined;
  /** issuance_date is the timestamp when the credit batch was issued. */
  issuanceDate?: Date | undefined;
  /**
   * open tells if it's possible to mint new credits in the future.
   * Once `open` is set to false, it can't be toggled any more.
   */
  open: boolean;
}
export interface BatchProtoMsg {
  typeUrl: "/regen.ecocredit.v1.Batch";
  value: Uint8Array;
}
/** Batch represents the high-level on-chain information for a credit batch. */
export interface BatchAmino {
  /**
   * key is the table row identifier of the credit batch used internally for
   * efficient lookups. This identifier is auto-incrementing.
   */
  key?: string;
  /**
   * issuer is the address that created the batch and which is
   * authorized to mint more credits if open=true.
   */
  issuer?: string;
  /**
   * project_key is the table row identifier of the credit class used internally
   * for efficient lookups. This links a credit batch to a project.
   */
  project_key?: string;
  /**
   * denom is the unique identifier of the credit batch formed from the
   * project id, the batch sequence number, and the start and end date of the
   * credit batch.
   */
  denom?: string;
  /** metadata is any arbitrary metadata attached to the credit batch. */
  metadata?: string;
  /**
   * start_date is the beginning of the period during which this credit batch
   * was quantified and verified.
   */
  start_date?: string | undefined;
  /**
   * end_date is the end of the period during which this credit batch was
   * quantified and verified.
   */
  end_date?: string | undefined;
  /** issuance_date is the timestamp when the credit batch was issued. */
  issuance_date?: string | undefined;
  /**
   * open tells if it's possible to mint new credits in the future.
   * Once `open` is set to false, it can't be toggled any more.
   */
  open?: boolean;
}
export interface BatchAminoMsg {
  type: "/regen.ecocredit.v1.Batch";
  value: BatchAmino;
}
/** Batch represents the high-level on-chain information for a credit batch. */
export interface BatchSDKType {
  key: bigint;
  issuer: Uint8Array;
  project_key: bigint;
  denom: string;
  metadata: string;
  start_date?: Date | undefined;
  end_date?: Date | undefined;
  issuance_date?: Date | undefined;
  open: boolean;
}
/**
 * ClassSequence stores and increments the sequence number for credit classes
 * within a credit type.
 */
export interface ClassSequence {
  /**
   * credit_type_abbrev is the credit type abbreviation. This links a class
   * sequence to a credit type.
   */
  creditTypeAbbrev: string;
  /**
   * next_sequence is the next sequence number for a credit class within the
   * credit type. The sequence number is used to generate a class id.
   */
  nextSequence: bigint;
}
export interface ClassSequenceProtoMsg {
  typeUrl: "/regen.ecocredit.v1.ClassSequence";
  value: Uint8Array;
}
/**
 * ClassSequence stores and increments the sequence number for credit classes
 * within a credit type.
 */
export interface ClassSequenceAmino {
  /**
   * credit_type_abbrev is the credit type abbreviation. This links a class
   * sequence to a credit type.
   */
  credit_type_abbrev?: string;
  /**
   * next_sequence is the next sequence number for a credit class within the
   * credit type. The sequence number is used to generate a class id.
   */
  next_sequence?: string;
}
export interface ClassSequenceAminoMsg {
  type: "/regen.ecocredit.v1.ClassSequence";
  value: ClassSequenceAmino;
}
/**
 * ClassSequence stores and increments the sequence number for credit classes
 * within a credit type.
 */
export interface ClassSequenceSDKType {
  credit_type_abbrev: string;
  next_sequence: bigint;
}
/**
 * ProjectSequence stores and increments the sequence number for projects within
 * a credit class.
 */
export interface ProjectSequence {
  /**
   * class_key is the table row identifier of the credit class used internally
   * for efficient lookups. This links a project sequence to a credit class.
   */
  classKey: bigint;
  /**
   * next_sequence is the next sequence number for a project within the credit
   * class. The sequence number is used to generate a project id.
   */
  nextSequence: bigint;
}
export interface ProjectSequenceProtoMsg {
  typeUrl: "/regen.ecocredit.v1.ProjectSequence";
  value: Uint8Array;
}
/**
 * ProjectSequence stores and increments the sequence number for projects within
 * a credit class.
 */
export interface ProjectSequenceAmino {
  /**
   * class_key is the table row identifier of the credit class used internally
   * for efficient lookups. This links a project sequence to a credit class.
   */
  class_key?: string;
  /**
   * next_sequence is the next sequence number for a project within the credit
   * class. The sequence number is used to generate a project id.
   */
  next_sequence?: string;
}
export interface ProjectSequenceAminoMsg {
  type: "/regen.ecocredit.v1.ProjectSequence";
  value: ProjectSequenceAmino;
}
/**
 * ProjectSequence stores and increments the sequence number for projects within
 * a credit class.
 */
export interface ProjectSequenceSDKType {
  class_key: bigint;
  next_sequence: bigint;
}
/**
 * BatchSequence stores and increments the sequence number for credit batches
 * within a project.
 */
export interface BatchSequence {
  /**
   * project_key is the table row identifier of the project used internally for
   * efficient lookups. This links a batch sequence to a project.
   */
  projectKey: bigint;
  /**
   * next_sequence is the next sequence number for a credit batch within the
   * project. The sequence number is used to generate a batch denom.
   */
  nextSequence: bigint;
}
export interface BatchSequenceProtoMsg {
  typeUrl: "/regen.ecocredit.v1.BatchSequence";
  value: Uint8Array;
}
/**
 * BatchSequence stores and increments the sequence number for credit batches
 * within a project.
 */
export interface BatchSequenceAmino {
  /**
   * project_key is the table row identifier of the project used internally for
   * efficient lookups. This links a batch sequence to a project.
   */
  project_key?: string;
  /**
   * next_sequence is the next sequence number for a credit batch within the
   * project. The sequence number is used to generate a batch denom.
   */
  next_sequence?: string;
}
export interface BatchSequenceAminoMsg {
  type: "/regen.ecocredit.v1.BatchSequence";
  value: BatchSequenceAmino;
}
/**
 * BatchSequence stores and increments the sequence number for credit batches
 * within a project.
 */
export interface BatchSequenceSDKType {
  project_key: bigint;
  next_sequence: bigint;
}
/** BatchBalance stores each accounts credit balance. */
export interface BatchBalance {
  /**
   * batch_key is the table row identifier of the credit batch used internally
   * for efficient lookups. This links a batch balance to a credit batch.
   */
  batchKey: bigint;
  /** address is the address of the account that owns the credits. */
  address: Uint8Array;
  /** tradable_amount is the total number of tradable credits owned by address. */
  tradableAmount: string;
  /** retired_amount is the total number of retired credits owned by address. */
  retiredAmount: string;
  /**
   * escrowed_amount is the total number of escrowed credits owned by address
   * and held in escrow by the marketplace. Credits are held in escrow when a
   * sell order is created and taken out of escrow when the sell order is either
   * cancelled, updated with a reduced quantity, or processed.
   */
  escrowedAmount: string;
}
export interface BatchBalanceProtoMsg {
  typeUrl: "/regen.ecocredit.v1.BatchBalance";
  value: Uint8Array;
}
/** BatchBalance stores each accounts credit balance. */
export interface BatchBalanceAmino {
  /**
   * batch_key is the table row identifier of the credit batch used internally
   * for efficient lookups. This links a batch balance to a credit batch.
   */
  batch_key?: string;
  /** address is the address of the account that owns the credits. */
  address?: string;
  /** tradable_amount is the total number of tradable credits owned by address. */
  tradable_amount?: string;
  /** retired_amount is the total number of retired credits owned by address. */
  retired_amount?: string;
  /**
   * escrowed_amount is the total number of escrowed credits owned by address
   * and held in escrow by the marketplace. Credits are held in escrow when a
   * sell order is created and taken out of escrow when the sell order is either
   * cancelled, updated with a reduced quantity, or processed.
   */
  escrowed_amount?: string;
}
export interface BatchBalanceAminoMsg {
  type: "/regen.ecocredit.v1.BatchBalance";
  value: BatchBalanceAmino;
}
/** BatchBalance stores each accounts credit balance. */
export interface BatchBalanceSDKType {
  batch_key: bigint;
  address: Uint8Array;
  tradable_amount: string;
  retired_amount: string;
  escrowed_amount: string;
}
/** BatchSupply stores the supply of credits for a credit batch. */
export interface BatchSupply {
  /**
   * batch_key is the table row identifier of the credit batch used internally
   * for efficient lookups. This links a batch supply to a credit batch.
   */
  batchKey: bigint;
  /**
   * tradable_amount is the total number of tradable credits in the credit
   * batch. Tradable credits may be retired in which case they will be removed
   * from tradable_amount and tracked in retired_amount. Tradable credits may
   * also be cancelled in which case they will be removed from tradable_amount
   * and tracked in cancelled_amount. The sum of the tradable, retired, and
   * cancelled amounts will always equal the original credit issuance amount.
   */
  tradableAmount: string;
  /**
   * retired_amount is the total amount of credits that have been retired in the
   * credit batch. The sum of the tradable, retired, and cancelled amounts will
   * always equal the original credit issuance amount.
   */
  retiredAmount: string;
  /**
   * cancelled_amount is the number of credits in the batch that have been
   * cancelled, effectively undoing the issuance. The sum of the tradable,
   * retired, and cancelled amounts will always equal the original credit
   * issuance amount.
   */
  cancelledAmount: string;
}
export interface BatchSupplyProtoMsg {
  typeUrl: "/regen.ecocredit.v1.BatchSupply";
  value: Uint8Array;
}
/** BatchSupply stores the supply of credits for a credit batch. */
export interface BatchSupplyAmino {
  /**
   * batch_key is the table row identifier of the credit batch used internally
   * for efficient lookups. This links a batch supply to a credit batch.
   */
  batch_key?: string;
  /**
   * tradable_amount is the total number of tradable credits in the credit
   * batch. Tradable credits may be retired in which case they will be removed
   * from tradable_amount and tracked in retired_amount. Tradable credits may
   * also be cancelled in which case they will be removed from tradable_amount
   * and tracked in cancelled_amount. The sum of the tradable, retired, and
   * cancelled amounts will always equal the original credit issuance amount.
   */
  tradable_amount?: string;
  /**
   * retired_amount is the total amount of credits that have been retired in the
   * credit batch. The sum of the tradable, retired, and cancelled amounts will
   * always equal the original credit issuance amount.
   */
  retired_amount?: string;
  /**
   * cancelled_amount is the number of credits in the batch that have been
   * cancelled, effectively undoing the issuance. The sum of the tradable,
   * retired, and cancelled amounts will always equal the original credit
   * issuance amount.
   */
  cancelled_amount?: string;
}
export interface BatchSupplyAminoMsg {
  type: "/regen.ecocredit.v1.BatchSupply";
  value: BatchSupplyAmino;
}
/** BatchSupply stores the supply of credits for a credit batch. */
export interface BatchSupplySDKType {
  batch_key: bigint;
  tradable_amount: string;
  retired_amount: string;
  cancelled_amount: string;
}
/**
 * OriginTxIndex indexes the transaction ID and source from the OriginTx
 * included in Msg/CreateBatch and Msg/MintBatchCredits to prevent double
 * minting errors. The index is scoped to a credit class (it includes the
 * class_key) to prevent malicious credit class issuers from blocking any
 * bridge operations taking place within another credit class.
 */
export interface OriginTxIndex {
  /**
   * class_key is the table row identifier of the credit class within which the
   * credits were issued or minted. The class_key is included within the index
   * to prevent malicious credit class issuers from blocking bridge operations
   * taking place within another credit class.
   */
  classKey: bigint;
  /**
   * id is the transaction ID of an originating transaction or operation
   * based on a type (i.e. transaction ID, serial number).
   */
  id: string;
  /**
   * source is the source chain or registry of the transaction originating
   * the mint process (e.g. polygon, ethereum, verra).
   */
  source: string;
}
export interface OriginTxIndexProtoMsg {
  typeUrl: "/regen.ecocredit.v1.OriginTxIndex";
  value: Uint8Array;
}
/**
 * OriginTxIndex indexes the transaction ID and source from the OriginTx
 * included in Msg/CreateBatch and Msg/MintBatchCredits to prevent double
 * minting errors. The index is scoped to a credit class (it includes the
 * class_key) to prevent malicious credit class issuers from blocking any
 * bridge operations taking place within another credit class.
 */
export interface OriginTxIndexAmino {
  /**
   * class_key is the table row identifier of the credit class within which the
   * credits were issued or minted. The class_key is included within the index
   * to prevent malicious credit class issuers from blocking bridge operations
   * taking place within another credit class.
   */
  class_key?: string;
  /**
   * id is the transaction ID of an originating transaction or operation
   * based on a type (i.e. transaction ID, serial number).
   */
  id?: string;
  /**
   * source is the source chain or registry of the transaction originating
   * the mint process (e.g. polygon, ethereum, verra).
   */
  source?: string;
}
export interface OriginTxIndexAminoMsg {
  type: "/regen.ecocredit.v1.OriginTxIndex";
  value: OriginTxIndexAmino;
}
/**
 * OriginTxIndex indexes the transaction ID and source from the OriginTx
 * included in Msg/CreateBatch and Msg/MintBatchCredits to prevent double
 * minting errors. The index is scoped to a credit class (it includes the
 * class_key) to prevent malicious credit class issuers from blocking any
 * bridge operations taking place within another credit class.
 */
export interface OriginTxIndexSDKType {
  class_key: bigint;
  id: string;
  source: string;
}
/**
 * BatchContract stores the contract address from which credits were bridged
 * when credits are bridged from a contract-based chain, therefore ensuring
 * that each credit batch corresponds to a single contract and credits that
 * have been bridged will always be bridged back to the original contract.
 */
export interface BatchContract {
  /**
   * batch_key is the table row identifier of the credit batch used internally
   * for efficient lookups. This links an external contract to a credit batch.
   */
  batchKey: bigint;
  /**
   * class_key is the table row identifier of the credit class within which the
   * credit batch exists. A contract is unique within the scope of a credit
   * class to prevent malicious credit class issuers from blocking bridge
   * operations taking place within another credit class.
   */
  classKey: bigint;
  /**
   * contract is the address of the contract on the source chain that was
   * executed when creating the transaction. This address will be used when
   * sending credits back to the source chain.
   */
  contract: string;
}
export interface BatchContractProtoMsg {
  typeUrl: "/regen.ecocredit.v1.BatchContract";
  value: Uint8Array;
}
/**
 * BatchContract stores the contract address from which credits were bridged
 * when credits are bridged from a contract-based chain, therefore ensuring
 * that each credit batch corresponds to a single contract and credits that
 * have been bridged will always be bridged back to the original contract.
 */
export interface BatchContractAmino {
  /**
   * batch_key is the table row identifier of the credit batch used internally
   * for efficient lookups. This links an external contract to a credit batch.
   */
  batch_key?: string;
  /**
   * class_key is the table row identifier of the credit class within which the
   * credit batch exists. A contract is unique within the scope of a credit
   * class to prevent malicious credit class issuers from blocking bridge
   * operations taking place within another credit class.
   */
  class_key?: string;
  /**
   * contract is the address of the contract on the source chain that was
   * executed when creating the transaction. This address will be used when
   * sending credits back to the source chain.
   */
  contract?: string;
}
export interface BatchContractAminoMsg {
  type: "/regen.ecocredit.v1.BatchContract";
  value: BatchContractAmino;
}
/**
 * BatchContract stores the contract address from which credits were bridged
 * when credits are bridged from a contract-based chain, therefore ensuring
 * that each credit batch corresponds to a single contract and credits that
 * have been bridged will always be bridged back to the original contract.
 */
export interface BatchContractSDKType {
  batch_key: bigint;
  class_key: bigint;
  contract: string;
}
/**
 * ClassCreatorAllowlist determines if the credit class creator allowlist is
 * enabled. When set to true, only the addresses in the AllowedClassCreator
 * table may create credit classes. When set to false, any address may create
 * credit classes. This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface ClassCreatorAllowlist {
  /** enabled is whether or not the allow list is enabled. */
  enabled: boolean;
}
export interface ClassCreatorAllowlistProtoMsg {
  typeUrl: "/regen.ecocredit.v1.ClassCreatorAllowlist";
  value: Uint8Array;
}
/**
 * ClassCreatorAllowlist determines if the credit class creator allowlist is
 * enabled. When set to true, only the addresses in the AllowedClassCreator
 * table may create credit classes. When set to false, any address may create
 * credit classes. This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface ClassCreatorAllowlistAmino {
  /** enabled is whether or not the allow list is enabled. */
  enabled?: boolean;
}
export interface ClassCreatorAllowlistAminoMsg {
  type: "/regen.ecocredit.v1.ClassCreatorAllowlist";
  value: ClassCreatorAllowlistAmino;
}
/**
 * ClassCreatorAllowlist determines if the credit class creator allowlist is
 * enabled. When set to true, only the addresses in the AllowedClassCreator
 * table may create credit classes. When set to false, any address may create
 * credit classes. This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface ClassCreatorAllowlistSDKType {
  enabled: boolean;
}
/**
 * AllowedClassCreator is an allowed credit class creator. This table is
 * controlled via governance.
 * 
 * Since Revision 2
 */
export interface AllowedClassCreator {
  /** address is the address that is allowed to create credit classes */
  address: Uint8Array;
}
export interface AllowedClassCreatorProtoMsg {
  typeUrl: "/regen.ecocredit.v1.AllowedClassCreator";
  value: Uint8Array;
}
/**
 * AllowedClassCreator is an allowed credit class creator. This table is
 * controlled via governance.
 * 
 * Since Revision 2
 */
export interface AllowedClassCreatorAmino {
  /** address is the address that is allowed to create credit classes */
  address?: string;
}
export interface AllowedClassCreatorAminoMsg {
  type: "/regen.ecocredit.v1.AllowedClassCreator";
  value: AllowedClassCreatorAmino;
}
/**
 * AllowedClassCreator is an allowed credit class creator. This table is
 * controlled via governance.
 * 
 * Since Revision 2
 */
export interface AllowedClassCreatorSDKType {
  address: Uint8Array;
}
/**
 * ClassFee is the credit class creation fee. If not set, a credit class
 * creation fee is not required. This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface ClassFee {
  /**
   * fee is the credit class creation fee. If not set, a credit class creation
   * fee is not required.
   */
  fee?: Coin | undefined;
}
export interface ClassFeeProtoMsg {
  typeUrl: "/regen.ecocredit.v1.ClassFee";
  value: Uint8Array;
}
/**
 * ClassFee is the credit class creation fee. If not set, a credit class
 * creation fee is not required. This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface ClassFeeAmino {
  /**
   * fee is the credit class creation fee. If not set, a credit class creation
   * fee is not required.
   */
  fee?: CoinAmino | undefined;
}
export interface ClassFeeAminoMsg {
  type: "/regen.ecocredit.v1.ClassFee";
  value: ClassFeeAmino;
}
/**
 * ClassFee is the credit class creation fee. If not set, a credit class
 * creation fee is not required. This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface ClassFeeSDKType {
  fee?: CoinSDKType | undefined;
}
/**
 * AllowedBridgeChain is a list of chains that are allowed to be used in
 * bridging operations. NOTE: chain_names MUST be converted to lowercase before
 * writing to and reading from this table in order to keep entries consistent.
 * This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface AllowedBridgeChain {
  /** chain_name is the name of the chain allowed to bridge ecocredits to. */
  chainName: string;
}
export interface AllowedBridgeChainProtoMsg {
  typeUrl: "/regen.ecocredit.v1.AllowedBridgeChain";
  value: Uint8Array;
}
/**
 * AllowedBridgeChain is a list of chains that are allowed to be used in
 * bridging operations. NOTE: chain_names MUST be converted to lowercase before
 * writing to and reading from this table in order to keep entries consistent.
 * This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface AllowedBridgeChainAmino {
  /** chain_name is the name of the chain allowed to bridge ecocredits to. */
  chain_name?: string;
}
export interface AllowedBridgeChainAminoMsg {
  type: "/regen.ecocredit.v1.AllowedBridgeChain";
  value: AllowedBridgeChainAmino;
}
/**
 * AllowedBridgeChain is a list of chains that are allowed to be used in
 * bridging operations. NOTE: chain_names MUST be converted to lowercase before
 * writing to and reading from this table in order to keep entries consistent.
 * This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface AllowedBridgeChainSDKType {
  chain_name: string;
}
function createBaseCreditType(): CreditType {
  return {
    abbreviation: "",
    name: "",
    unit: "",
    precision: 0
  };
}
export const CreditType = {
  typeUrl: "/regen.ecocredit.v1.CreditType",
  encode(message: CreditType, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.abbreviation !== "") {
      writer.uint32(10).string(message.abbreviation);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.unit !== "") {
      writer.uint32(26).string(message.unit);
    }
    if (message.precision !== 0) {
      writer.uint32(32).uint32(message.precision);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CreditType {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreditType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.abbreviation = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.unit = reader.string();
          break;
        case 4:
          message.precision = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CreditType>): CreditType {
    const message = createBaseCreditType();
    message.abbreviation = object.abbreviation ?? "";
    message.name = object.name ?? "";
    message.unit = object.unit ?? "";
    message.precision = object.precision ?? 0;
    return message;
  },
  fromAmino(object: CreditTypeAmino): CreditType {
    const message = createBaseCreditType();
    if (object.abbreviation !== undefined && object.abbreviation !== null) {
      message.abbreviation = object.abbreviation;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = object.unit;
    }
    if (object.precision !== undefined && object.precision !== null) {
      message.precision = object.precision;
    }
    return message;
  },
  toAmino(message: CreditType, useInterfaces: boolean = false): CreditTypeAmino {
    const obj: any = {};
    obj.abbreviation = message.abbreviation;
    obj.name = message.name;
    obj.unit = message.unit;
    obj.precision = message.precision;
    return obj;
  },
  fromAminoMsg(object: CreditTypeAminoMsg): CreditType {
    return CreditType.fromAmino(object.value);
  },
  fromProtoMsg(message: CreditTypeProtoMsg, useInterfaces: boolean = false): CreditType {
    return CreditType.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CreditType): Uint8Array {
    return CreditType.encode(message).finish();
  },
  toProtoMsg(message: CreditType): CreditTypeProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.CreditType",
      value: CreditType.encode(message).finish()
    };
  }
};
function createBaseClass(): Class {
  return {
    key: BigInt(0),
    id: "",
    admin: new Uint8Array(),
    metadata: "",
    creditTypeAbbrev: ""
  };
}
export const Class = {
  typeUrl: "/regen.ecocredit.v1.Class",
  encode(message: Class, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== BigInt(0)) {
      writer.uint32(8).uint64(message.key);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.admin.length !== 0) {
      writer.uint32(26).bytes(message.admin);
    }
    if (message.metadata !== "") {
      writer.uint32(34).string(message.metadata);
    }
    if (message.creditTypeAbbrev !== "") {
      writer.uint32(42).string(message.creditTypeAbbrev);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Class {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClass();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.uint64();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.admin = reader.bytes();
          break;
        case 4:
          message.metadata = reader.string();
          break;
        case 5:
          message.creditTypeAbbrev = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Class>): Class {
    const message = createBaseClass();
    message.key = object.key !== undefined && object.key !== null ? BigInt(object.key.toString()) : BigInt(0);
    message.id = object.id ?? "";
    message.admin = object.admin ?? new Uint8Array();
    message.metadata = object.metadata ?? "";
    message.creditTypeAbbrev = object.creditTypeAbbrev ?? "";
    return message;
  },
  fromAmino(object: ClassAmino): Class {
    const message = createBaseClass();
    if (object.key !== undefined && object.key !== null) {
      message.key = BigInt(object.key);
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = bytesFromBase64(object.admin);
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.credit_type_abbrev !== undefined && object.credit_type_abbrev !== null) {
      message.creditTypeAbbrev = object.credit_type_abbrev;
    }
    return message;
  },
  toAmino(message: Class, useInterfaces: boolean = false): ClassAmino {
    const obj: any = {};
    obj.key = message.key ? message.key.toString() : undefined;
    obj.id = message.id;
    obj.admin = message.admin ? base64FromBytes(message.admin) : undefined;
    obj.metadata = message.metadata;
    obj.credit_type_abbrev = message.creditTypeAbbrev;
    return obj;
  },
  fromAminoMsg(object: ClassAminoMsg): Class {
    return Class.fromAmino(object.value);
  },
  fromProtoMsg(message: ClassProtoMsg, useInterfaces: boolean = false): Class {
    return Class.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Class): Uint8Array {
    return Class.encode(message).finish();
  },
  toProtoMsg(message: Class): ClassProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.Class",
      value: Class.encode(message).finish()
    };
  }
};
function createBaseClassIssuer(): ClassIssuer {
  return {
    classKey: BigInt(0),
    issuer: new Uint8Array()
  };
}
export const ClassIssuer = {
  typeUrl: "/regen.ecocredit.v1.ClassIssuer",
  encode(message: ClassIssuer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classKey !== BigInt(0)) {
      writer.uint32(8).uint64(message.classKey);
    }
    if (message.issuer.length !== 0) {
      writer.uint32(18).bytes(message.issuer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ClassIssuer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassIssuer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classKey = reader.uint64();
          break;
        case 2:
          message.issuer = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ClassIssuer>): ClassIssuer {
    const message = createBaseClassIssuer();
    message.classKey = object.classKey !== undefined && object.classKey !== null ? BigInt(object.classKey.toString()) : BigInt(0);
    message.issuer = object.issuer ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ClassIssuerAmino): ClassIssuer {
    const message = createBaseClassIssuer();
    if (object.class_key !== undefined && object.class_key !== null) {
      message.classKey = BigInt(object.class_key);
    }
    if (object.issuer !== undefined && object.issuer !== null) {
      message.issuer = bytesFromBase64(object.issuer);
    }
    return message;
  },
  toAmino(message: ClassIssuer, useInterfaces: boolean = false): ClassIssuerAmino {
    const obj: any = {};
    obj.class_key = message.classKey ? message.classKey.toString() : undefined;
    obj.issuer = message.issuer ? base64FromBytes(message.issuer) : undefined;
    return obj;
  },
  fromAminoMsg(object: ClassIssuerAminoMsg): ClassIssuer {
    return ClassIssuer.fromAmino(object.value);
  },
  fromProtoMsg(message: ClassIssuerProtoMsg, useInterfaces: boolean = false): ClassIssuer {
    return ClassIssuer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ClassIssuer): Uint8Array {
    return ClassIssuer.encode(message).finish();
  },
  toProtoMsg(message: ClassIssuer): ClassIssuerProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.ClassIssuer",
      value: ClassIssuer.encode(message).finish()
    };
  }
};
function createBaseProject(): Project {
  return {
    key: BigInt(0),
    id: "",
    admin: new Uint8Array(),
    classKey: BigInt(0),
    jurisdiction: "",
    metadata: "",
    referenceId: ""
  };
}
export const Project = {
  typeUrl: "/regen.ecocredit.v1.Project",
  encode(message: Project, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== BigInt(0)) {
      writer.uint32(8).uint64(message.key);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.admin.length !== 0) {
      writer.uint32(26).bytes(message.admin);
    }
    if (message.classKey !== BigInt(0)) {
      writer.uint32(32).uint64(message.classKey);
    }
    if (message.jurisdiction !== "") {
      writer.uint32(42).string(message.jurisdiction);
    }
    if (message.metadata !== "") {
      writer.uint32(50).string(message.metadata);
    }
    if (message.referenceId !== "") {
      writer.uint32(58).string(message.referenceId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Project {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.uint64();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.admin = reader.bytes();
          break;
        case 4:
          message.classKey = reader.uint64();
          break;
        case 5:
          message.jurisdiction = reader.string();
          break;
        case 6:
          message.metadata = reader.string();
          break;
        case 7:
          message.referenceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Project>): Project {
    const message = createBaseProject();
    message.key = object.key !== undefined && object.key !== null ? BigInt(object.key.toString()) : BigInt(0);
    message.id = object.id ?? "";
    message.admin = object.admin ?? new Uint8Array();
    message.classKey = object.classKey !== undefined && object.classKey !== null ? BigInt(object.classKey.toString()) : BigInt(0);
    message.jurisdiction = object.jurisdiction ?? "";
    message.metadata = object.metadata ?? "";
    message.referenceId = object.referenceId ?? "";
    return message;
  },
  fromAmino(object: ProjectAmino): Project {
    const message = createBaseProject();
    if (object.key !== undefined && object.key !== null) {
      message.key = BigInt(object.key);
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = bytesFromBase64(object.admin);
    }
    if (object.class_key !== undefined && object.class_key !== null) {
      message.classKey = BigInt(object.class_key);
    }
    if (object.jurisdiction !== undefined && object.jurisdiction !== null) {
      message.jurisdiction = object.jurisdiction;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.reference_id !== undefined && object.reference_id !== null) {
      message.referenceId = object.reference_id;
    }
    return message;
  },
  toAmino(message: Project, useInterfaces: boolean = false): ProjectAmino {
    const obj: any = {};
    obj.key = message.key ? message.key.toString() : undefined;
    obj.id = message.id;
    obj.admin = message.admin ? base64FromBytes(message.admin) : undefined;
    obj.class_key = message.classKey ? message.classKey.toString() : undefined;
    obj.jurisdiction = message.jurisdiction;
    obj.metadata = message.metadata;
    obj.reference_id = message.referenceId;
    return obj;
  },
  fromAminoMsg(object: ProjectAminoMsg): Project {
    return Project.fromAmino(object.value);
  },
  fromProtoMsg(message: ProjectProtoMsg, useInterfaces: boolean = false): Project {
    return Project.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Project): Uint8Array {
    return Project.encode(message).finish();
  },
  toProtoMsg(message: Project): ProjectProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.Project",
      value: Project.encode(message).finish()
    };
  }
};
function createBaseBatch(): Batch {
  return {
    key: BigInt(0),
    issuer: new Uint8Array(),
    projectKey: BigInt(0),
    denom: "",
    metadata: "",
    startDate: undefined,
    endDate: undefined,
    issuanceDate: undefined,
    open: false
  };
}
export const Batch = {
  typeUrl: "/regen.ecocredit.v1.Batch",
  encode(message: Batch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== BigInt(0)) {
      writer.uint32(8).uint64(message.key);
    }
    if (message.issuer.length !== 0) {
      writer.uint32(18).bytes(message.issuer);
    }
    if (message.projectKey !== BigInt(0)) {
      writer.uint32(24).uint64(message.projectKey);
    }
    if (message.denom !== "") {
      writer.uint32(34).string(message.denom);
    }
    if (message.metadata !== "") {
      writer.uint32(42).string(message.metadata);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(50).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(58).fork()).ldelim();
    }
    if (message.issuanceDate !== undefined) {
      Timestamp.encode(toTimestamp(message.issuanceDate), writer.uint32(66).fork()).ldelim();
    }
    if (message.open === true) {
      writer.uint32(72).bool(message.open);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Batch {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.uint64();
          break;
        case 2:
          message.issuer = reader.bytes();
          break;
        case 3:
          message.projectKey = reader.uint64();
          break;
        case 4:
          message.denom = reader.string();
          break;
        case 5:
          message.metadata = reader.string();
          break;
        case 6:
          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.issuanceDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.open = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Batch>): Batch {
    const message = createBaseBatch();
    message.key = object.key !== undefined && object.key !== null ? BigInt(object.key.toString()) : BigInt(0);
    message.issuer = object.issuer ?? new Uint8Array();
    message.projectKey = object.projectKey !== undefined && object.projectKey !== null ? BigInt(object.projectKey.toString()) : BigInt(0);
    message.denom = object.denom ?? "";
    message.metadata = object.metadata ?? "";
    message.startDate = object.startDate ?? undefined;
    message.endDate = object.endDate ?? undefined;
    message.issuanceDate = object.issuanceDate ?? undefined;
    message.open = object.open ?? false;
    return message;
  },
  fromAmino(object: BatchAmino): Batch {
    const message = createBaseBatch();
    if (object.key !== undefined && object.key !== null) {
      message.key = BigInt(object.key);
    }
    if (object.issuer !== undefined && object.issuer !== null) {
      message.issuer = bytesFromBase64(object.issuer);
    }
    if (object.project_key !== undefined && object.project_key !== null) {
      message.projectKey = BigInt(object.project_key);
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    if (object.start_date !== undefined && object.start_date !== null) {
      message.startDate = fromTimestamp(Timestamp.fromAmino(object.start_date));
    }
    if (object.end_date !== undefined && object.end_date !== null) {
      message.endDate = fromTimestamp(Timestamp.fromAmino(object.end_date));
    }
    if (object.issuance_date !== undefined && object.issuance_date !== null) {
      message.issuanceDate = fromTimestamp(Timestamp.fromAmino(object.issuance_date));
    }
    if (object.open !== undefined && object.open !== null) {
      message.open = object.open;
    }
    return message;
  },
  toAmino(message: Batch, useInterfaces: boolean = false): BatchAmino {
    const obj: any = {};
    obj.key = message.key ? message.key.toString() : undefined;
    obj.issuer = message.issuer ? base64FromBytes(message.issuer) : undefined;
    obj.project_key = message.projectKey ? message.projectKey.toString() : undefined;
    obj.denom = message.denom;
    obj.metadata = message.metadata;
    obj.start_date = message.startDate ? Timestamp.toAmino(toTimestamp(message.startDate)) : undefined;
    obj.end_date = message.endDate ? Timestamp.toAmino(toTimestamp(message.endDate)) : undefined;
    obj.issuance_date = message.issuanceDate ? Timestamp.toAmino(toTimestamp(message.issuanceDate)) : undefined;
    obj.open = message.open;
    return obj;
  },
  fromAminoMsg(object: BatchAminoMsg): Batch {
    return Batch.fromAmino(object.value);
  },
  fromProtoMsg(message: BatchProtoMsg, useInterfaces: boolean = false): Batch {
    return Batch.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Batch): Uint8Array {
    return Batch.encode(message).finish();
  },
  toProtoMsg(message: Batch): BatchProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.Batch",
      value: Batch.encode(message).finish()
    };
  }
};
function createBaseClassSequence(): ClassSequence {
  return {
    creditTypeAbbrev: "",
    nextSequence: BigInt(0)
  };
}
export const ClassSequence = {
  typeUrl: "/regen.ecocredit.v1.ClassSequence",
  encode(message: ClassSequence, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creditTypeAbbrev !== "") {
      writer.uint32(10).string(message.creditTypeAbbrev);
    }
    if (message.nextSequence !== BigInt(0)) {
      writer.uint32(16).uint64(message.nextSequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ClassSequence {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creditTypeAbbrev = reader.string();
          break;
        case 2:
          message.nextSequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ClassSequence>): ClassSequence {
    const message = createBaseClassSequence();
    message.creditTypeAbbrev = object.creditTypeAbbrev ?? "";
    message.nextSequence = object.nextSequence !== undefined && object.nextSequence !== null ? BigInt(object.nextSequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ClassSequenceAmino): ClassSequence {
    const message = createBaseClassSequence();
    if (object.credit_type_abbrev !== undefined && object.credit_type_abbrev !== null) {
      message.creditTypeAbbrev = object.credit_type_abbrev;
    }
    if (object.next_sequence !== undefined && object.next_sequence !== null) {
      message.nextSequence = BigInt(object.next_sequence);
    }
    return message;
  },
  toAmino(message: ClassSequence, useInterfaces: boolean = false): ClassSequenceAmino {
    const obj: any = {};
    obj.credit_type_abbrev = message.creditTypeAbbrev;
    obj.next_sequence = message.nextSequence ? message.nextSequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ClassSequenceAminoMsg): ClassSequence {
    return ClassSequence.fromAmino(object.value);
  },
  fromProtoMsg(message: ClassSequenceProtoMsg, useInterfaces: boolean = false): ClassSequence {
    return ClassSequence.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ClassSequence): Uint8Array {
    return ClassSequence.encode(message).finish();
  },
  toProtoMsg(message: ClassSequence): ClassSequenceProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.ClassSequence",
      value: ClassSequence.encode(message).finish()
    };
  }
};
function createBaseProjectSequence(): ProjectSequence {
  return {
    classKey: BigInt(0),
    nextSequence: BigInt(0)
  };
}
export const ProjectSequence = {
  typeUrl: "/regen.ecocredit.v1.ProjectSequence",
  encode(message: ProjectSequence, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classKey !== BigInt(0)) {
      writer.uint32(8).uint64(message.classKey);
    }
    if (message.nextSequence !== BigInt(0)) {
      writer.uint32(16).uint64(message.nextSequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ProjectSequence {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProjectSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classKey = reader.uint64();
          break;
        case 2:
          message.nextSequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ProjectSequence>): ProjectSequence {
    const message = createBaseProjectSequence();
    message.classKey = object.classKey !== undefined && object.classKey !== null ? BigInt(object.classKey.toString()) : BigInt(0);
    message.nextSequence = object.nextSequence !== undefined && object.nextSequence !== null ? BigInt(object.nextSequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ProjectSequenceAmino): ProjectSequence {
    const message = createBaseProjectSequence();
    if (object.class_key !== undefined && object.class_key !== null) {
      message.classKey = BigInt(object.class_key);
    }
    if (object.next_sequence !== undefined && object.next_sequence !== null) {
      message.nextSequence = BigInt(object.next_sequence);
    }
    return message;
  },
  toAmino(message: ProjectSequence, useInterfaces: boolean = false): ProjectSequenceAmino {
    const obj: any = {};
    obj.class_key = message.classKey ? message.classKey.toString() : undefined;
    obj.next_sequence = message.nextSequence ? message.nextSequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ProjectSequenceAminoMsg): ProjectSequence {
    return ProjectSequence.fromAmino(object.value);
  },
  fromProtoMsg(message: ProjectSequenceProtoMsg, useInterfaces: boolean = false): ProjectSequence {
    return ProjectSequence.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ProjectSequence): Uint8Array {
    return ProjectSequence.encode(message).finish();
  },
  toProtoMsg(message: ProjectSequence): ProjectSequenceProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.ProjectSequence",
      value: ProjectSequence.encode(message).finish()
    };
  }
};
function createBaseBatchSequence(): BatchSequence {
  return {
    projectKey: BigInt(0),
    nextSequence: BigInt(0)
  };
}
export const BatchSequence = {
  typeUrl: "/regen.ecocredit.v1.BatchSequence",
  encode(message: BatchSequence, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.projectKey !== BigInt(0)) {
      writer.uint32(8).uint64(message.projectKey);
    }
    if (message.nextSequence !== BigInt(0)) {
      writer.uint32(16).uint64(message.nextSequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BatchSequence {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectKey = reader.uint64();
          break;
        case 2:
          message.nextSequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BatchSequence>): BatchSequence {
    const message = createBaseBatchSequence();
    message.projectKey = object.projectKey !== undefined && object.projectKey !== null ? BigInt(object.projectKey.toString()) : BigInt(0);
    message.nextSequence = object.nextSequence !== undefined && object.nextSequence !== null ? BigInt(object.nextSequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: BatchSequenceAmino): BatchSequence {
    const message = createBaseBatchSequence();
    if (object.project_key !== undefined && object.project_key !== null) {
      message.projectKey = BigInt(object.project_key);
    }
    if (object.next_sequence !== undefined && object.next_sequence !== null) {
      message.nextSequence = BigInt(object.next_sequence);
    }
    return message;
  },
  toAmino(message: BatchSequence, useInterfaces: boolean = false): BatchSequenceAmino {
    const obj: any = {};
    obj.project_key = message.projectKey ? message.projectKey.toString() : undefined;
    obj.next_sequence = message.nextSequence ? message.nextSequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: BatchSequenceAminoMsg): BatchSequence {
    return BatchSequence.fromAmino(object.value);
  },
  fromProtoMsg(message: BatchSequenceProtoMsg, useInterfaces: boolean = false): BatchSequence {
    return BatchSequence.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BatchSequence): Uint8Array {
    return BatchSequence.encode(message).finish();
  },
  toProtoMsg(message: BatchSequence): BatchSequenceProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.BatchSequence",
      value: BatchSequence.encode(message).finish()
    };
  }
};
function createBaseBatchBalance(): BatchBalance {
  return {
    batchKey: BigInt(0),
    address: new Uint8Array(),
    tradableAmount: "",
    retiredAmount: "",
    escrowedAmount: ""
  };
}
export const BatchBalance = {
  typeUrl: "/regen.ecocredit.v1.BatchBalance",
  encode(message: BatchBalance, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchKey !== BigInt(0)) {
      writer.uint32(8).uint64(message.batchKey);
    }
    if (message.address.length !== 0) {
      writer.uint32(18).bytes(message.address);
    }
    if (message.tradableAmount !== "") {
      writer.uint32(26).string(message.tradableAmount);
    }
    if (message.retiredAmount !== "") {
      writer.uint32(34).string(message.retiredAmount);
    }
    if (message.escrowedAmount !== "") {
      writer.uint32(42).string(message.escrowedAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BatchBalance {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchKey = reader.uint64();
          break;
        case 2:
          message.address = reader.bytes();
          break;
        case 3:
          message.tradableAmount = reader.string();
          break;
        case 4:
          message.retiredAmount = reader.string();
          break;
        case 5:
          message.escrowedAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BatchBalance>): BatchBalance {
    const message = createBaseBatchBalance();
    message.batchKey = object.batchKey !== undefined && object.batchKey !== null ? BigInt(object.batchKey.toString()) : BigInt(0);
    message.address = object.address ?? new Uint8Array();
    message.tradableAmount = object.tradableAmount ?? "";
    message.retiredAmount = object.retiredAmount ?? "";
    message.escrowedAmount = object.escrowedAmount ?? "";
    return message;
  },
  fromAmino(object: BatchBalanceAmino): BatchBalance {
    const message = createBaseBatchBalance();
    if (object.batch_key !== undefined && object.batch_key !== null) {
      message.batchKey = BigInt(object.batch_key);
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = bytesFromBase64(object.address);
    }
    if (object.tradable_amount !== undefined && object.tradable_amount !== null) {
      message.tradableAmount = object.tradable_amount;
    }
    if (object.retired_amount !== undefined && object.retired_amount !== null) {
      message.retiredAmount = object.retired_amount;
    }
    if (object.escrowed_amount !== undefined && object.escrowed_amount !== null) {
      message.escrowedAmount = object.escrowed_amount;
    }
    return message;
  },
  toAmino(message: BatchBalance, useInterfaces: boolean = false): BatchBalanceAmino {
    const obj: any = {};
    obj.batch_key = message.batchKey ? message.batchKey.toString() : undefined;
    obj.address = message.address ? base64FromBytes(message.address) : undefined;
    obj.tradable_amount = message.tradableAmount;
    obj.retired_amount = message.retiredAmount;
    obj.escrowed_amount = message.escrowedAmount;
    return obj;
  },
  fromAminoMsg(object: BatchBalanceAminoMsg): BatchBalance {
    return BatchBalance.fromAmino(object.value);
  },
  fromProtoMsg(message: BatchBalanceProtoMsg, useInterfaces: boolean = false): BatchBalance {
    return BatchBalance.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BatchBalance): Uint8Array {
    return BatchBalance.encode(message).finish();
  },
  toProtoMsg(message: BatchBalance): BatchBalanceProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.BatchBalance",
      value: BatchBalance.encode(message).finish()
    };
  }
};
function createBaseBatchSupply(): BatchSupply {
  return {
    batchKey: BigInt(0),
    tradableAmount: "",
    retiredAmount: "",
    cancelledAmount: ""
  };
}
export const BatchSupply = {
  typeUrl: "/regen.ecocredit.v1.BatchSupply",
  encode(message: BatchSupply, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchKey !== BigInt(0)) {
      writer.uint32(8).uint64(message.batchKey);
    }
    if (message.tradableAmount !== "") {
      writer.uint32(18).string(message.tradableAmount);
    }
    if (message.retiredAmount !== "") {
      writer.uint32(26).string(message.retiredAmount);
    }
    if (message.cancelledAmount !== "") {
      writer.uint32(34).string(message.cancelledAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BatchSupply {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchSupply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchKey = reader.uint64();
          break;
        case 2:
          message.tradableAmount = reader.string();
          break;
        case 3:
          message.retiredAmount = reader.string();
          break;
        case 4:
          message.cancelledAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BatchSupply>): BatchSupply {
    const message = createBaseBatchSupply();
    message.batchKey = object.batchKey !== undefined && object.batchKey !== null ? BigInt(object.batchKey.toString()) : BigInt(0);
    message.tradableAmount = object.tradableAmount ?? "";
    message.retiredAmount = object.retiredAmount ?? "";
    message.cancelledAmount = object.cancelledAmount ?? "";
    return message;
  },
  fromAmino(object: BatchSupplyAmino): BatchSupply {
    const message = createBaseBatchSupply();
    if (object.batch_key !== undefined && object.batch_key !== null) {
      message.batchKey = BigInt(object.batch_key);
    }
    if (object.tradable_amount !== undefined && object.tradable_amount !== null) {
      message.tradableAmount = object.tradable_amount;
    }
    if (object.retired_amount !== undefined && object.retired_amount !== null) {
      message.retiredAmount = object.retired_amount;
    }
    if (object.cancelled_amount !== undefined && object.cancelled_amount !== null) {
      message.cancelledAmount = object.cancelled_amount;
    }
    return message;
  },
  toAmino(message: BatchSupply, useInterfaces: boolean = false): BatchSupplyAmino {
    const obj: any = {};
    obj.batch_key = message.batchKey ? message.batchKey.toString() : undefined;
    obj.tradable_amount = message.tradableAmount;
    obj.retired_amount = message.retiredAmount;
    obj.cancelled_amount = message.cancelledAmount;
    return obj;
  },
  fromAminoMsg(object: BatchSupplyAminoMsg): BatchSupply {
    return BatchSupply.fromAmino(object.value);
  },
  fromProtoMsg(message: BatchSupplyProtoMsg, useInterfaces: boolean = false): BatchSupply {
    return BatchSupply.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BatchSupply): Uint8Array {
    return BatchSupply.encode(message).finish();
  },
  toProtoMsg(message: BatchSupply): BatchSupplyProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.BatchSupply",
      value: BatchSupply.encode(message).finish()
    };
  }
};
function createBaseOriginTxIndex(): OriginTxIndex {
  return {
    classKey: BigInt(0),
    id: "",
    source: ""
  };
}
export const OriginTxIndex = {
  typeUrl: "/regen.ecocredit.v1.OriginTxIndex",
  encode(message: OriginTxIndex, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classKey !== BigInt(0)) {
      writer.uint32(8).uint64(message.classKey);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): OriginTxIndex {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOriginTxIndex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classKey = reader.uint64();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.source = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OriginTxIndex>): OriginTxIndex {
    const message = createBaseOriginTxIndex();
    message.classKey = object.classKey !== undefined && object.classKey !== null ? BigInt(object.classKey.toString()) : BigInt(0);
    message.id = object.id ?? "";
    message.source = object.source ?? "";
    return message;
  },
  fromAmino(object: OriginTxIndexAmino): OriginTxIndex {
    const message = createBaseOriginTxIndex();
    if (object.class_key !== undefined && object.class_key !== null) {
      message.classKey = BigInt(object.class_key);
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    }
    return message;
  },
  toAmino(message: OriginTxIndex, useInterfaces: boolean = false): OriginTxIndexAmino {
    const obj: any = {};
    obj.class_key = message.classKey ? message.classKey.toString() : undefined;
    obj.id = message.id;
    obj.source = message.source;
    return obj;
  },
  fromAminoMsg(object: OriginTxIndexAminoMsg): OriginTxIndex {
    return OriginTxIndex.fromAmino(object.value);
  },
  fromProtoMsg(message: OriginTxIndexProtoMsg, useInterfaces: boolean = false): OriginTxIndex {
    return OriginTxIndex.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: OriginTxIndex): Uint8Array {
    return OriginTxIndex.encode(message).finish();
  },
  toProtoMsg(message: OriginTxIndex): OriginTxIndexProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.OriginTxIndex",
      value: OriginTxIndex.encode(message).finish()
    };
  }
};
function createBaseBatchContract(): BatchContract {
  return {
    batchKey: BigInt(0),
    classKey: BigInt(0),
    contract: ""
  };
}
export const BatchContract = {
  typeUrl: "/regen.ecocredit.v1.BatchContract",
  encode(message: BatchContract, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchKey !== BigInt(0)) {
      writer.uint32(8).uint64(message.batchKey);
    }
    if (message.classKey !== BigInt(0)) {
      writer.uint32(16).uint64(message.classKey);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BatchContract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchKey = reader.uint64();
          break;
        case 2:
          message.classKey = reader.uint64();
          break;
        case 3:
          message.contract = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BatchContract>): BatchContract {
    const message = createBaseBatchContract();
    message.batchKey = object.batchKey !== undefined && object.batchKey !== null ? BigInt(object.batchKey.toString()) : BigInt(0);
    message.classKey = object.classKey !== undefined && object.classKey !== null ? BigInt(object.classKey.toString()) : BigInt(0);
    message.contract = object.contract ?? "";
    return message;
  },
  fromAmino(object: BatchContractAmino): BatchContract {
    const message = createBaseBatchContract();
    if (object.batch_key !== undefined && object.batch_key !== null) {
      message.batchKey = BigInt(object.batch_key);
    }
    if (object.class_key !== undefined && object.class_key !== null) {
      message.classKey = BigInt(object.class_key);
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    return message;
  },
  toAmino(message: BatchContract, useInterfaces: boolean = false): BatchContractAmino {
    const obj: any = {};
    obj.batch_key = message.batchKey ? message.batchKey.toString() : undefined;
    obj.class_key = message.classKey ? message.classKey.toString() : undefined;
    obj.contract = message.contract;
    return obj;
  },
  fromAminoMsg(object: BatchContractAminoMsg): BatchContract {
    return BatchContract.fromAmino(object.value);
  },
  fromProtoMsg(message: BatchContractProtoMsg, useInterfaces: boolean = false): BatchContract {
    return BatchContract.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BatchContract): Uint8Array {
    return BatchContract.encode(message).finish();
  },
  toProtoMsg(message: BatchContract): BatchContractProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.BatchContract",
      value: BatchContract.encode(message).finish()
    };
  }
};
function createBaseClassCreatorAllowlist(): ClassCreatorAllowlist {
  return {
    enabled: false
  };
}
export const ClassCreatorAllowlist = {
  typeUrl: "/regen.ecocredit.v1.ClassCreatorAllowlist",
  encode(message: ClassCreatorAllowlist, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ClassCreatorAllowlist {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassCreatorAllowlist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ClassCreatorAllowlist>): ClassCreatorAllowlist {
    const message = createBaseClassCreatorAllowlist();
    message.enabled = object.enabled ?? false;
    return message;
  },
  fromAmino(object: ClassCreatorAllowlistAmino): ClassCreatorAllowlist {
    const message = createBaseClassCreatorAllowlist();
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    }
    return message;
  },
  toAmino(message: ClassCreatorAllowlist, useInterfaces: boolean = false): ClassCreatorAllowlistAmino {
    const obj: any = {};
    obj.enabled = message.enabled;
    return obj;
  },
  fromAminoMsg(object: ClassCreatorAllowlistAminoMsg): ClassCreatorAllowlist {
    return ClassCreatorAllowlist.fromAmino(object.value);
  },
  fromProtoMsg(message: ClassCreatorAllowlistProtoMsg, useInterfaces: boolean = false): ClassCreatorAllowlist {
    return ClassCreatorAllowlist.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ClassCreatorAllowlist): Uint8Array {
    return ClassCreatorAllowlist.encode(message).finish();
  },
  toProtoMsg(message: ClassCreatorAllowlist): ClassCreatorAllowlistProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.ClassCreatorAllowlist",
      value: ClassCreatorAllowlist.encode(message).finish()
    };
  }
};
function createBaseAllowedClassCreator(): AllowedClassCreator {
  return {
    address: new Uint8Array()
  };
}
export const AllowedClassCreator = {
  typeUrl: "/regen.ecocredit.v1.AllowedClassCreator",
  encode(message: AllowedClassCreator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllowedClassCreator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowedClassCreator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllowedClassCreator>): AllowedClassCreator {
    const message = createBaseAllowedClassCreator();
    message.address = object.address ?? new Uint8Array();
    return message;
  },
  fromAmino(object: AllowedClassCreatorAmino): AllowedClassCreator {
    const message = createBaseAllowedClassCreator();
    if (object.address !== undefined && object.address !== null) {
      message.address = bytesFromBase64(object.address);
    }
    return message;
  },
  toAmino(message: AllowedClassCreator, useInterfaces: boolean = false): AllowedClassCreatorAmino {
    const obj: any = {};
    obj.address = message.address ? base64FromBytes(message.address) : undefined;
    return obj;
  },
  fromAminoMsg(object: AllowedClassCreatorAminoMsg): AllowedClassCreator {
    return AllowedClassCreator.fromAmino(object.value);
  },
  fromProtoMsg(message: AllowedClassCreatorProtoMsg, useInterfaces: boolean = false): AllowedClassCreator {
    return AllowedClassCreator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllowedClassCreator): Uint8Array {
    return AllowedClassCreator.encode(message).finish();
  },
  toProtoMsg(message: AllowedClassCreator): AllowedClassCreatorProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.AllowedClassCreator",
      value: AllowedClassCreator.encode(message).finish()
    };
  }
};
function createBaseClassFee(): ClassFee {
  return {
    fee: undefined
  };
}
export const ClassFee = {
  typeUrl: "/regen.ecocredit.v1.ClassFee",
  encode(message: ClassFee, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ClassFee {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ClassFee>): ClassFee {
    const message = createBaseClassFee();
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: ClassFeeAmino): ClassFee {
    const message = createBaseClassFee();
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: ClassFee, useInterfaces: boolean = false): ClassFeeAmino {
    const obj: any = {};
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ClassFeeAminoMsg): ClassFee {
    return ClassFee.fromAmino(object.value);
  },
  fromProtoMsg(message: ClassFeeProtoMsg, useInterfaces: boolean = false): ClassFee {
    return ClassFee.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ClassFee): Uint8Array {
    return ClassFee.encode(message).finish();
  },
  toProtoMsg(message: ClassFee): ClassFeeProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.ClassFee",
      value: ClassFee.encode(message).finish()
    };
  }
};
function createBaseAllowedBridgeChain(): AllowedBridgeChain {
  return {
    chainName: ""
  };
}
export const AllowedBridgeChain = {
  typeUrl: "/regen.ecocredit.v1.AllowedBridgeChain",
  encode(message: AllowedBridgeChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllowedBridgeChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowedBridgeChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllowedBridgeChain>): AllowedBridgeChain {
    const message = createBaseAllowedBridgeChain();
    message.chainName = object.chainName ?? "";
    return message;
  },
  fromAmino(object: AllowedBridgeChainAmino): AllowedBridgeChain {
    const message = createBaseAllowedBridgeChain();
    if (object.chain_name !== undefined && object.chain_name !== null) {
      message.chainName = object.chain_name;
    }
    return message;
  },
  toAmino(message: AllowedBridgeChain, useInterfaces: boolean = false): AllowedBridgeChainAmino {
    const obj: any = {};
    obj.chain_name = message.chainName;
    return obj;
  },
  fromAminoMsg(object: AllowedBridgeChainAminoMsg): AllowedBridgeChain {
    return AllowedBridgeChain.fromAmino(object.value);
  },
  fromProtoMsg(message: AllowedBridgeChainProtoMsg, useInterfaces: boolean = false): AllowedBridgeChain {
    return AllowedBridgeChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllowedBridgeChain): Uint8Array {
    return AllowedBridgeChain.encode(message).finish();
  },
  toProtoMsg(message: AllowedBridgeChain): AllowedBridgeChainProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.AllowedBridgeChain",
      value: AllowedBridgeChain.encode(message).finish()
    };
  }
};