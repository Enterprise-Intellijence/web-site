import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Address, AddressDTO, DeliveryControllerService, UserControllerService, UserDTO } from 'src/app/services/api-service';
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
  addresses? = new Array<AddressDTO>();
  countries? = new Array<Country>();
  cities? = new Array<City>();

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
    if(!this.country || !this.city || !this.street || !this.phoneNumber || !this.zipCode)
      alert("Fill all the fields");

    else if(!/^\d+$/.test(this.phoneNumber!) || !/^\d+$/.test(this.zipCode!))
      alert("Invalid fields: phone number and postal code must contain only digits");
    
    else {
      let address: AddressDTO = {
        id: "",
        header: "",
        country: this.country.name!,
        city: this.city.name!,
        street: this.street,
        phoneNumber: this.phoneNumber,
        zipCode: this.zipCode
      };

      this.deliveryService.createAddress(address).subscribe(res => {
        console.log("address res: ", res);
        alert("New address added");
        this.addresses?.push(address);
      });
    }
  }

  ngOnInit() {
    this.currentUserService.user$.subscribe(user => {
      this.user = user;
      this.addresses = this.user?.addresses;
      this.userService.getDefaultAddress(this.user?.id!).subscribe(addr => {
        this.defaultAddress = addr;
        console.log("default addr: ", addr);
      });
      console.log("user: ", this.user);
      console.log("indirizzi: ", this.addresses);
      this.addresses?.forEach(a => {
        console.log("bool: ", a._default);
      })
    });  

    this.getCountries();
  }


  getCountries() {
    this.cscService.countriesGet().subscribe(res => {
      console.log("counties: ", res);
      this.countries = res;
    });
  }

  getCities() {
    this.cscService.countriesCisoCitiesGet(this.country!.iso2!).subscribe(res => {
      console.log("counties: ", res);
      this.cities = res;
    });
  }

  onCountrySelected(c: Country) {
    this.country = c;
    this.getCities();
  }

  setDefaultAddress(address: AddressDTO) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private currentUserService: CurrentUserService,
    private deliveryService: DeliveryControllerService,
    private cscService: CSCService,
    private userService: UserControllerService) {}
}







