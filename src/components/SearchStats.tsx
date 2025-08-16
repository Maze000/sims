import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, MapPin, Star } from "lucide-react";

interface SearchStatsProps {
  totalTherapists: number;
  averageRating: number;
  averagePrice: number;
  topSpecialty: string;
  topLocation: string;
}

const SearchStats = ({ 
  totalTherapists, 
  averageRating, 
  averagePrice, 
  topSpecialty, 
  topLocation 
}: SearchStatsProps) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">
                <strong>{totalTherapists}</strong> therapists available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">
                <strong>{averageRating}</strong> avg rating
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">
                <strong>${averagePrice}</strong> avg price
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              Popular: {topLocation}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Top: {topSpecialty}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchStats;
