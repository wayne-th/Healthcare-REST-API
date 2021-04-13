import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferDto } from './dto/offer.dto';
import { AgreementType } from './entities/agreementType.entity';
import { Offer } from './entities/offer.entity';
import { Profession } from './entities/profession.entity';
import { Specialization } from './entities/specialization.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Profession)
    private professionRepository: Repository<Profession>,
    @InjectRepository(Specialization)
    private specializationRepository: Repository<Specialization>,
    @InjectRepository(AgreementType)
    private agreementTypeRepository: Repository<AgreementType>,
  ) {}

  findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  async findOne(id: number): Promise<Offer> {
    const foundOffer = await this.offerRepository.findOne(id);
    if (!foundOffer) {
      throw new NotFoundException(`Offer with ID "${id}" not found`);
    }

    return foundOffer;
  }

  create(data: OfferDto): Promise<Offer> {
    return this.offerRepository.create(data).save();
  }

  async update(id: number, data: OfferDto): Promise<void> {
    await this.offerRepository.update(id, data);
  }

  findAllProfessions(): Promise<Profession[]> {
    return this.professionRepository.find();
  }

  findAllSpecializations(professionId: number): Promise<Specialization[]> {
    return this.specializationRepository.find({ profession_id: professionId });
  }

  findAllAgreementTypes(): Promise<AgreementType[]> {
    return this.agreementTypeRepository.find();
  }
}
