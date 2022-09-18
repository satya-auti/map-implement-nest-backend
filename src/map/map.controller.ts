import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { MapEntity } from './entity/map.entity';
import { Map } from './entity/map.interface';
import { MapModel } from './entity/map.model';
import { MapPatch } from './entity/map.patch';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
    constructor(private mapService: MapService){}
    // const proj =4326; 

    @Get()
    findAllMapData(): Observable<Map[]> {
      console.log("function called"); 
      return this.mapService.findAllMapData();
    }

    @Post()
    createMapData(@Body() mapModel:MapModel): Observable<MapEntity> {
    // createMapData(@Body() mapModel:MapModel): Promise<Map> {

        // let dummy = new MapEntity();
        // dummy.lat = mapModel.lat;
        // dummy.lon = mapModel.lon;
        // dummy.name = mapModel.name;
        // dummy.city = mapModel.city;
        // ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326);

        let queryGeo  =  "ST_SetSRID(ST_MakePoint(" + mapModel.lat + ", " + mapModel.lon + "), 4326)";
        console.log("query "+queryGeo);
        
        return this.mapService.createMapData(mapModel);
    }

    // @Patch('patch/:id')
    // updateMapPatch(
    //         @Param('id') id: number,
    //         @Body() mapPatch: MapPatch,
    //     ): Observable<UpdateResult> {
    //     return this.mapService.updateMapPatch(id, mapPatch);
    // }

}