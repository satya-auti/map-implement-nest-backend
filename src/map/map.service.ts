import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Connection, DataSource, Repository, UpdateResult } from 'typeorm';
import { MapEntity } from './entity/map.entity';
import { Map } from './entity/map.interface';
import { MapModel } from './entity/map.model';
import { MapPatch } from './entity/map.patch';

@Injectable()
export class MapService {
constructor(
    @InjectRepository(MapEntity)
    private readonly mapRepository: Repository<MapEntity>,

    // @InjectDataSource() 
    // private dataSource: DataSource,

    // @InjectConnection() 
    // private readonly connection: Connection
){}

 proj:any = 4326;
 id:number;
 lat:number;
 lon:number;

    findAllMapData(): Observable<Map[]>{
        return from(this.mapRepository.find())
    }

    createMapData(mapModel:MapModel): Observable<MapEntity> {
    // createMapData(mapModel:MapModel): Promise<Map> {

        // this.updateGeography(mapModel.lat,mapModel.lon);
        let dummy = new MapEntity();
        dummy.lat = mapModel.lat;
        dummy.lon = mapModel.lon;
        dummy.name = mapModel.name;
        dummy.city = mapModel.city;
        // ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326);

        console.log("data",mapModel);
        
        // this.mapRepository.save(mapModel).then(res => {
        //     this.id = res.id;
        //     // this.lat = res.lat;
        //     this.lat = parseFloat(res.lat);
        //     this.lon = parseFloat(res.lon);
        //     let rawData  =  this.dataSource.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
        //     console.log(rawData);
        // });
        // return;
         from(this.mapRepository.save(mapModel).then( res => {
                console.log("hited", res);
                
                this.id = res.id ;
                this.lat = parseFloat(res.lat);
                this.lon = parseFloat(res.lon);
                // this.doSomeQuery();
                // this.UpdatePoint();
                // let rawData  =  this.dataSource.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
                // console.log("raw ", rawData);
            
            })
        );
         return;
    }
   
    // UpdatePoint
    // UpdatePoint() {
    // //     // let rawData  =  this.dataSource.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
    // //     let rawData  =  this.dataSource.query("UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326) WHERE id=1");
    // //     console.log(rawData);
    // let abc = `UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`;
    // this.dataSource.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
    // console.log("executed " ,abc);
      
    // }

//   async doSomeQuery() {
//     console.log( "other func ", `UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
    
//     return this.connection.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
//   }

    // function UpdatePoint1() {
    //     let rawData = this.dataSource.query("UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326) WHERE id=1");
    //     console.log(rawData);
    // }
       
    // updateMapPatch(id: number, mapPatch: MapPatch): Observable<UpdateResult> {
        
    //     return from(this.mapRepository.update(id, mapPatch));
    // }

    // updateGeography(lat,lon) {
    //     let queryGeo  =  "ST_SetSRID(ST_MakePoint(" + lat + ", " + lon + "), 4326)";
    //     return "query"+queryGeo;
    // }
}
