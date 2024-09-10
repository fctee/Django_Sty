# Generated by Django 5.1.1 on 2024-09-10 09:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app01', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='title',
            field=models.CharField(max_length=32, unique=True, verbose_name='标题'),
        ),
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=200, verbose_name='项目名称')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='费用')),
                ('currency', models.CharField(choices=[('RMB', '人民币'), ('USD', '美元')], default='RMB', max_length=3, verbose_name='币种')),
                ('supplier', models.CharField(max_length=200, null=True, verbose_name='供应商')),
                ('confirmed_by', models.CharField(max_length=10, null=True, verbose_name='费用确认人')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='app01.department', verbose_name='部门')),
            ],
        ),
    ]
