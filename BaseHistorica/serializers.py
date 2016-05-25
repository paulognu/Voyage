from rest_framework import serializers
from BaseHistorica.models import pas_r, pds_r

class pas_rSerializer(serializers.ModelSerializer):
    class Meta:
        model = pas_r
        

class pds_rSerializer(serializers.ModelSerializer):
    class Meta:
        model = pds_r        