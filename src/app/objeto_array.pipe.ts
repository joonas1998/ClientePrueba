import { Pipe ,PipeTransform } from "@angular/core";

@Pipe({
    name: 'ObjToarray'
})
export class objToarrayPipe implements PipeTransform
{
    transform(object : any =[]):any {
        return Object.values(object);
    }
}