import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Address, AddressCreateDTO, AddressDTO, DeliveryControllerService, UserControllerService, UserDTO } from 'src/app/services/api-service';
import { CSCService, City, Country } from 'src/app/services/country-city-api';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  arrowRight = faAngleRight
  user: UserDTO | null = null;
  addresses?= new Array<AddressDTO>();
  countries?= new Array<Country>();
  cities?= new Array<City>();

  defaultAddress?: AddressDTO;
  country?: Country;
  city?: City;
  street?: string;
  phoneNumber?: string;
  public zipCode?: string;


  deleteAddress(address: AddressDTO, i: number) {
    this.deliveryService.deleteAddress(address.id).subscribe(res => {
      console.log("res delete: ", res);
      alert("Address deleted");
      this.addresses?.splice(i, 1);
    });
  }

  updateAddress(address: AddressDTO) {
    console.log("addr ", address);
    this.deliveryService.updateAddress(address, address.id).subscribe(res => {
      console.log("res update: ", res);
      alert("Address saved");
    });
  }

  saveNewAddress() {
    if (!this.country || !this.city || !this.street || !this.phoneNumber || !this.zipCode)
      alert("Fill all the fields");

    else if (!/^\d+$/.test(this.phoneNumber!) || !/^\d+$/.test(this.zipCode!))
      alert("Invalid fields: phone number and postal code must contain only digits");

    else {
      let address: AddressCreateDTO = {
        header: "default",
        country: this.country.name!,
        city: this.city.name!,
        street: this.street,
        phoneNumber: this.phoneNumber,
        zipCode: this.zipCode,
        // @ts-ignore
        isDefault: false
      };

      this.deliveryService.createAddress(address).subscribe(res => {
        console.log("address res: ", res);
        this.addresses?.push(res);
        this.currentUserService.getUser();
      });
    }
  }

  ngOnInit() {
    this.currentUserService.user$.subscribe(user => {
      this.user = user;
      this.addresses = this.user?.addresses;
      console.log("user: ", user);

      this.userService.getDefaultAddress(user?.id!).subscribe(addr => {
        this.defaultAddress = addr || undefined;
        console.log("default addr: ", addr);
      });
      console.log("user: ", this.user);
      console.log("indirizzi: ", this.addresses);
      this.addresses?.forEach(a => {
        console.log("is default: ", a._default);
      })
    });

    this.getCountries();
  }


  getCountries() {
    this.cscService.countriesGet().subscribe(res => {
      console.log("countries: ", res);
      this.countries = res;
    });
  }

  getCities() {

    if (!this.country)
      throw new Error("country is null");

    this.cscService.countriesCisoCitiesGet(this.country.iso2!).subscribe(res => {
      console.log("cities: ", res);
      this.cities = res;
    });
  }

  onCountrySelected(c: Country) {
    this.country = c;
    this.getCities();
  }

  setDefaultAddress(address: AddressDTO, value: boolean = true) {
    // @ts-ignore
    address.isDefault = value;

    this.deliveryService.replaceAddress(address, address.id).subscribe(res => {
      console.log("res: ", res);
      alert("Default address set");
      this.currentUserService.getUser();
    });
  }

  constructor(
    private currentUserService: CurrentUserService,
    private deliveryService: DeliveryControllerService,
    private cscService: CSCService,
    private userService: UserControllerService) { }
}







