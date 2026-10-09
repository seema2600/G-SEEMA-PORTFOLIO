use ecommerce_delivery_opertions;

rename table Ecommerce_Delivery_Operations_Intelligence_Dataset
to ecommerce;

select*from ecommerce
limit 10;

select count(*) from ecommerce;

select order_ID,order_Date,customer_ID,city,product_category from ecommerce
limit 10;

select distinct(customer_segment) from ecommerce;

select region,count(order_ID) from ecommerce
group by region;

select order_status,count(order_ID) from ecommerce
group by order_status;

select sum(quantity) from ecommerce;

select avg(Unit_Price) from ecommerce;

select city,count(order_ID) as num_of_order from ecommerce
group by city;

select product_category,count(order_ID) as num_of_order
from ecommerce
group by product_category
order by num_of_order desc;

select product,count(order_ID) as num_of_order 
from ecommerce
group by product
order by num_of_order desc
limit 5;

select sum(quantity*unit_price) as total_revenue
from ecommerce;

select avg(quantity*unit_price) as avg_order_value
from ecommerce;

select product_category,sum(quantity*unit_price) as total_revenue 
from ecommerce
group by product_category
order by total_revenue desc;

select region,sum(quantity*unit_price) as total_revenue
from ecommerce
group by region
order by total_revenue desc;

select customer_segment,sum(quantity*unit_price) as total_revenue
from ecommerce
group by customer_segment
order by total_revenue desc;

select Delivery_partner,count(order_ID) as num_of_order 
from ecommerce
group by Delivery_partner;

select order_status,count(order_status) as num_of_order
from ecommerce
group by order_status
order by num_of_order desc;

select Delivery_partner,avg(datediff(Actual_Delivery_Date,order_date)) as avg_d_date
from ecommerce
group by Delivery_partner;

select count(*) as late_d
from ecommerce
where Actual_Delivery_Date>Expected_Delivery_Date;

select avg(datediff(Actual_Delivery_Date,Expected_Delivery_Date)) as avg_d_date
from ecommerce
where Actual_Delivery_Date>Expected_Delivery_Date;

select Delivery_partner,sum(quantity*unit_price) as total_rev
from ecommerce
group by Delivery_partner;

select customer_segment,avg(quantity*unit_price) as order_value
from ecommerce
group by customer_segment;

select Delivery_partner,count(*) as l_dliv
from ecommerce
where Actual_Delivery_Date>Expected_Delivery_Date
group by Delivery_partner;

select order_status,sum(quantity*unit_price) as total_rev
from ecommerce
group by order_status
order by total_rev desc;

select city,sum(quantity*unit_price) as total_rev
from ecommerce
group by city
order by total_rev desc
limit 5;

select product_category,sum(quantity) as total_quantity
from ecommerce
group by product_category;

select product_category,avg(unit_price) as avg_up
from ecommerce
group by product_category
order by avg_up desc;

select payment_mode,count(order_Id) as num_of_order
from ecommerce
group by payment_mode
order by num_of_order desc;

select sales_channel,sum(quantity*unit_price) as total_rev
from ecommerce 
group by sales_channel;

select product,sum(quantity*unit_price) as total_rev
from ecommerce 
group by product
order by total_rev desc
limit 5 ;
















select*from ecommerce;
describe ecommerce;
